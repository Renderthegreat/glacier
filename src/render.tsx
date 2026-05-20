import { Component, type Child, Signal, } from 'rynth';

/**
 * A very simple registry that maps keys to nodes.
 * It is much smaller than a virtual *DOM*.
 */
export type Registry = WeakMap<symbol, Node>;

/**
 * Resolves a single child ({@link Component}, {@link Signal}, or primitive) into a physical DOM Node.
 */
function resolveChild({ child, registry, root, }: { child: Child, registry: Registry, root: Component, }): Node | null {
	if (child instanceof Component) {
		return render({ root: child, registry, });
	};

	if (child instanceof Signal) {
		// We always return a stable Node (either the initial rendered node or a placeholder) so that future updates can replace it in-place.
		const placeholder = globalThis.document.createComment('signal');

		let currentNode: Node | null = null;
		let lastValue = child.value;

		const mountForValue = (value: any): Node | null => {
			if (value instanceof Component) {
				return render({ root: value, registry, });
			};

			if (value === null) {
				return null;
			};

			if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
				return globalThis.document.createTextNode(String(value));
			};

			return null;
		};

		// Initialize current node (or use placeholder if nothing to render yet).
		currentNode = mountForValue(lastValue);
		const nodeToReturn = currentNode ?? placeholder;

		// Subscribe to future updates and swap nodes in the DOM as needed.
		const unsubscribe = child.subscribe((value) => {
			if (value === lastValue) return;

			const previous = lastValue;
			lastValue = value;

			// If the previous value was a Component, emit unmount so it can cleanup.
			if (previous instanceof Component) {
				previous.lifecycle.emit('unmount');
				registry.delete(previous.key);
			};

			const newNode = mountForValue(value);

			if (newNode) {
				// Insert or replace in DOM.
				if (currentNode) {
					(currentNode as ChildNode).replaceWith(newNode);
				} else {
					(placeholder as ChildNode).replaceWith(newNode);
				};
				currentNode = newNode;
			} else {
				// New value is null — remove current node and restore placeholder.
				if (currentNode) {
					(currentNode as ChildNode).replaceWith(placeholder);
					currentNode = null;
				};
			};
		});

		root.lifecycle.addCleanupTask(unsubscribe);

		return nodeToReturn;
	};

	if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
		return globalThis.document.createTextNode(String(child));
	};

	return null;
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

			return empty;
		};

		const fragment = globalThis.document.createDocumentFragment();
		let firstNode: Node | null = null;

		for (const child of root.config.children) {
			const childNode = resolveChild({ child, registry, root, });
			if (childNode) {
				fragment.appendChild(childNode);

				if (!firstNode) {
					firstNode = childNode;
				}; // Track the first one for the registry.
			};
		};

		if (firstNode) {
			registry.set(root.key, firstNode);
		};

		// HACK(+): If there's only 1 child, just return it directly to avoid the Fragment wrapper.
		// TODO: Check if this causes any issues.
		return root.config.children.length === 1 && firstNode ? firstNode : fragment;
	};

	// Handle Standard Elements.
	const node: Element = window.document.createElement((root.key.description) as keyof HTMLElementTagNameMap);
	registry.set(root.key, node);

	// Apply attributes gracefully.
	for (const [key, value] of Object.entries(root.config)) {
		if (key === 'children') {
			continue;
		};

		// Support reactive attribute values via `Signal`.
		if (value instanceof Signal) {
			const v = value.value;
			if (v == null) {
				node.removeAttribute(key);
			} else {
				node.setAttribute(key, String(v));
			};

			const unsubscribeAttribute = value.subscribe((value) => {
				if (value == null) {
					node.removeAttribute(key);
				} else {
					node.setAttribute(key, String(value));
				};
			});

			root.lifecycle.addCleanupTask(unsubscribeAttribute);

			continue;
		};

		if (value == null) {
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