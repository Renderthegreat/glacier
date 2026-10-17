// # Blocks.

import { primitive, } from '#~/index.ts';

export * from '#~/components/head.tsx';
export * from '#~/components/body.tsx';

export * from '#~/components/header.tsx';
export * from '#~/components/main.tsx';
export * from '#~/components/footer.tsx';


export * from '#~/components/navigation.tsx';

export * from '#~/components/div.tsx';
export * from '#~/components/span.tsx';

export * from '#~/components/block-quote.tsx';
export * from '#~/components/quote.tsx';

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

export * from '#~/components/form.tsx';

// # Custom components.


// Check to ensure we are running in the browser.
if (globalThis['window'] !== undefined) {
	globalThis.customElements.define('glacier-text', class extends HTMLElement {
		public static get observedAttributes() {
			return [
				'bold',
				'italic',
				// TODO: ...
				'level',
			];
		};

		private wrapper: HTMLSpanElement;

		public constructor() {
			super();

			const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true, });

			this.wrapper = globalThis.document.createElement('span');

			const style = globalThis.document.createElement('style');
			style.textContent = `:host { display: inline; }`;

			shadow.appendChild(style);
			shadow.appendChild(this.wrapper);
			// ...
		};

		private attributeChangedCallback(_name: string, oldValue: string, newValue: string): void {
			if (oldValue !== newValue) {
				this.updateAccessibilityTree();
			};
		};

		private updateAccessibilityTree(): void {
			this.wrapper.innerHTML = '';

			let currentElement: HTMLElement = globalThis.document.createElement('slot');

			if (this.getAttribute('bold') === 'true') {
				const strong = globalThis.document.createElement('strong');
				strong.appendChild(currentElement);
				currentElement = strong;
			};
			
			if (this.getAttribute('italic') === 'true') {
				const italic = globalThis.document.createElement('em');
				italic.appendChild(currentElement);
				currentElement = italic;
			};

			if (this.getAttribute('level')) {
				const header = globalThis.document.createElement(`h${this.getAttribute('level')}`);
				header.appendChild(currentElement);
				currentElement = header;

				console.log(this.getAttribute('level'));
			};

			this.wrapper.appendChild(currentElement);
		};
	});

	globalThis.customElements.define('glacier-anchor', class extends HTMLElement {
		public static get observedAttributes(): string[] {
			return ['reference'];
		};

		public constructor() {
			super();

			const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true, });

			const anchor = globalThis.document.createElement('a');
			anchor.href = this.getAttribute('reference') || '#';

			const slot = globalThis.document.createElement('slot');
			anchor.appendChild(slot);

			anchor.style.all = 'inherit'; // Inherit all styles from the `glacier-anchor`.

			shadow.appendChild(anchor);
		};

		public attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
			if (name === 'reference') {
				const anchor = this.shadowRoot?.firstChild as HTMLAnchorElement;
				anchor.href = newValue;

				return;
			};
		};
	});

	globalThis.customElements.define('glacier-shadow', class extends HTMLElement {
		public constructor() {
			super();

			const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true, });

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
// TODO: ...
export const Missing = primitive<any>((component) => {
	return component;
}, Symbol('glacier-missing'));