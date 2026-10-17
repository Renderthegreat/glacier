import { Component, type Child, Signal, } from 'rynth';

/**
 * A very simple registry that maps keys to nodes.
 * It is much smaller than a virtual *DOM*.
 */
export class Registry extends /* Weak */Map<symbol, Node> {

};

/**
 * Resolves a single child ({@link Component}, {@link Signal}, or primitive) into a physical DOM Node.
 */
function resolveChild({ child, registry, root, }: { child: Child, registry: Registry, root: Component, }): Node | null {
	if (child instanceof Component) {
		return render({ root: child, registry, });
	};

	if (child instanceof Signal) {
		const placeholder = globalThis.document.createComment('signal');
		const container = globalThis.document.createDocumentFragment();

		let currentNodes: Node[] = [];
		let lastValue = child.value;

		const mountForValue = (value: any): Node[] => {
			if (value === null || value === undefined) {
				return [];
			};

			let rendered: Node;
			if (value instanceof Component) {
				rendered = render({ root: value, registry, });
			} else {
				rendered = globalThis.document.createTextNode(String(value));
			};

			// Extract nodes before the fragment is appended and emptied by the DOM.
			if (rendered instanceof DocumentFragment) {
				return Array.from(rendered.childNodes);
			};

			return [rendered];
		};

		// Initialize current nodes and append them alongside the anchor placeholder.
		currentNodes = mountForValue(lastValue);
		for (const node of currentNodes) {
			container.appendChild(node);
		};
		container.appendChild(placeholder);

		// Subscribe to updates and swap nodes relative to the anchor.
		const unsubscribe = child.subscribe((value) => {
			if (value === lastValue) {
				return;
			};

			const previous = lastValue;
			lastValue = value;

			if (previous instanceof Component) {
				previous.lifecycle.emit('unmount');
				previous.lifecycle.cleanup();
				registry.delete(previous.key);
			};

			const newNodes = mountForValue(value);

			// Insert new nodes directly before the anchor placeholder.
			for (const node of newNodes) {
				placeholder.before(node);
			};

			// Clean up previous DOM nodes.
			for (const node of currentNodes) {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				};
			};

			currentNodes = newNodes;
		});

		root.lifecycle.addCleanupTask(unsubscribe);

		return container;
	};

	return globalThis.document.createTextNode(
		(child === null || child === undefined) ? '' : String(child),
	);
};

/**
 * Renders a given component tree into a DOM node.
 */
export function render({ root, registry, }: { root: Component, registry: Registry, }): Node {
	const isFragment: boolean = (root.key.description === undefined)
		? (true)
		: (root.key.description === '')
	;

	// Handle Fragments.
	if (isFragment) {
		if (root.config.children.length === 0) {
			const empty = globalThis.document.createTextNode('');
			registry.set(root.key, empty);

			// # Yes, this is necessary!
			root.lifecycle.emit('mount', { node: empty, });

			return empty;
		};

		const fragment = globalThis.document.createDocumentFragment();
		let firstNode: Node | null = null;

		for (const child of root.config.children) {
			const childNode = resolveChild({ child, registry, root, });
			if (childNode) {
				fragment.appendChild(childNode);

				if (firstNode === null) {
					firstNode = childNode;
				}; // Track the first one for the registry.
			};
		};

		if (firstNode) {
			registry.set(root.key, firstNode);
		};

		const node = /*root.config.children.length === 1 && firstNode ? firstNode : fragment*/ fragment;

		// Fire lifecycle hook.
		// FIX: Duo mount bug.
		root.lifecycle.emit('mount', { node, });

		return node;
	};

	// Handle Standard Elements.
	const node: Element = globalThis.document.createElement((root.key.description) as keyof HTMLElementTagNameMap);
	registry.set(root.key, node);

	// Apply attributes gracefully.
	for (const [key, value] of Object.entries(root.config)) {
		if (key === 'children' || key.startsWith('bind:')) {
			continue;
		};

		// Support reactive attribute values via `Signal`.
		if (value instanceof Signal) {
			const v = value.value;

			if (v == null || v === false) {
				node.removeAttribute(key);
			} else {
				node.setAttribute(key, String(v));
			};

			const unsubscribeAttribute = value.subscribe((value) => {
				if (value == null || v === false) {
					node.removeAttribute(key);
				} else {
					node.setAttribute(key, String(value));
				};
			});

			root.lifecycle.addCleanupTask(unsubscribeAttribute);

			continue;
		};

		// TODO: Check if I need to account for `false`.
		if (value === null) {
			node.removeAttribute(key);
		} else {
			node.setAttribute(key, String(value));
		};
	};

	// Append all children using our modular helper.
	for (const child of root.config.children) {
		const childNode: Node | null = resolveChild({ child, registry, root, });

		if (childNode) {
			node.appendChild(childNode);
		};
	};

	// Fire lifecycle hook.
	root.lifecycle.emit('mount', { node, });

	return node;
};