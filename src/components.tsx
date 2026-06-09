// # Blocks.

import { primitive, } from '#~/index.ts';

export * from '#~/components/head.tsx';
export * from '#~/components/body.tsx';

export * from '#~/components/header.tsx';

export * from '#~/components/navigation.tsx';

export * from '#~/components/div.tsx';
export * from '#~/components/span.tsx';

export * from '#~/components/text.tsx';

export * from '#~/components/link.tsx';

export * from '#~/components/canvas.tsx';

export * from '#~/components/break.tsx';

// # Head elements.
export * from '#~/components/meta.tsx';
export * from '#~/components/style.tsx';


// # ...
export * from '#~/components/button.tsx';
export * from '#~/components/input.tsx';
export * from '#~/components/image.tsx';

// # State based.
export * from '#~/components/show.tsx';
export * from '#~/components/collection.tsx';

// # *Markdown*.
export * from '#~/ui/mint.tsx';

// # Custom components.


// Check to ensure we are running in the browser.
if (globalThis['window'] !== undefined) {
	globalThis.customElements.define('glacier-text', class extends HTMLElement {
		public constructor() {
			super();
		};
	});

	globalThis.customElements.define('glacier-anchor', class extends HTMLElement {
		public static get observedAttributes(): string[] {
			return ['reference'];
		};

		public constructor() {
			super();

			const shadow = this.attachShadow({ mode: 'open', });

			const anchor = globalThis.document.createElement('a');
			anchor.href = this.getAttribute('reference') || '#.tsx';

			const slot = globalThis.document.createElement('slot');
			anchor.appendChild(slot);

			anchor.style.all = 'inherit'; // Inherit all styles from the `glacier-anchor`.

			shadow.appendChild(anchor);
		};

		public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
			if (name === 'reference') {
				const anchor = this.shadowRoot?.firstChild as HTMLAnchorElement;
				anchor.href = newValue;
			};

			console.log(name);
		};
	});

	globalThis.customElements.define('glacier-shadow', class extends HTMLElement {
		public constructor() {
			super();

			const shadow = this.attachShadow({ mode: 'open', });

			const slot = globalThis.document.createElement('slot');

			shadow.appendChild(slot);
		};
	});
};

export const Shadow = primitive<Record<PropertyKey, never>>((component) => {
	if (component.config.children.length !== 1) {
		// TODO: Handle error using *Glacier*.	
		console.error('Shadow component must have 1 child.');

		return <Missing />;
	};

	return component;
}, Symbol('glacier-shadow'));

// ? Should `any` be used here?
export const Missing = primitive<any>((component) => {
	return component;
}, Symbol('glacier-missing'));