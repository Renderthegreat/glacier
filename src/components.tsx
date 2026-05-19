// # Blocks.

import { primitive, } from '#~/index';

export * from '#~/components/head';
export * from '#~/components/body';

export * from '#~/components/header';

export * from '#~/components/navigation';

export * from '#~/components/div';
export * from '#~/components/span';

export * from '#~/components/text';

export * from '#~/components/link';

export * from '#~/components/canvas';

export * from '#~/components/break';

// # Head elements.
export * from '#~/components/meta';

// # ...
export * from '#~/components/button';
export * from '#~/components/input';

// # State based.
export * from '#~/components/show';
export * from '#~/components/collection';

// # Custom components

// Check to ensure we are running in the browser.
if (globalThis['window'] !== undefined) {
	window.customElements.define('glacier-text', class extends HTMLElement {
		public constructor() {
			super();
		};
	});

	window.customElements.define('glacier-anchor', class extends HTMLElement {
		public static get observedAttributes(): string[] {
			return ['reference'];
		};

		public constructor() {
			super();

			const shadow = this.attachShadow({ mode: 'open', });

			const anchor = window.document.createElement('a');
			anchor.href = this.getAttribute('reference') || '#';

			const slot = window.document.createElement('slot');
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

	window.customElements.define('glacier-shadow', class extends HTMLElement {
		public constructor() {
			super();

			const shadow = this.attachShadow({ mode: 'open', });

			const slot = window.document.createElement('slot');

			shadow.appendChild(slot);
		};
	});
};

export const Shadow = primitive<{}>((component) => {
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