import * as Rynth from 'rynth';

/*export type Style = {
	// TODO: Implement everything.
	base?: Style.Properties,

	before?: Style.Properties,
	after?: Style.Properties,
};*/

// deno-lint-ignore no-namespace
export namespace Style {
	/*export type Properties = {
		display?: Style.Display,
		gap?: Length,
		
		content?: string, // TODO: Change this.
		color?: string, // And this.
	};

	export type Length = {
		unit: string,

	};

	export enum Display {
		Block = 'block',
		Inline = 'inline',
		InlineBlock = 'inline-block',
		InlineFlex = 'inline-flex',
		Flex = 'flex',
		InlineGrid = 'inline-grid',
		Grid = 'grid',
	};*/

	export class Sheet {

	};

	function convertToStyleElement(sheet: CSSStyleSheet) {
		const cssText = Array.from(sheet.cssRules)
			.map(rule => rule.cssText)
			.join('\n')
		;
	
		const styleElement = globalThis.document.createElement('style');
		styleElement.textContent = cssText;
	
		return styleElement;
	};

	export function setup(element: HTMLElement, sheet?: CSSStyleSheet): void {
		if (sheet === undefined) {
			return;
		};

		let shadow: ShadowRoot;

		try {
			shadow = element.attachShadow({ mode: 'open', });
		} catch (error) {
			shadow = element.shadowRoot!;

			if (!(shadow ?? false)) {
				// TODO: Handle errors with *Glacier*.
				console.error(`Element cannot host a shadow root or is closed: ${error}.`);

				console.log(element.tagName, element.shadowRoot);

				return;
			};
		};

		// This works.
		// console.log(sheet.cssRules.item(0));
		shadow.appendChild(convertToStyleElement(sheet));


		// Include the original content.
		if (shadow.querySelector('slot') ?? true) {
			const slot = globalThis.document.createElement('slot');
			shadow.appendChild(slot);
		};

		console.log(element.querySelectorAll('.crumb').entries().toArray().map((node) => node[1].tagName));
		
		// But nothing here.
		// console.log(element.computedStyleMap().entries().toArray(), element.tagName);
	};


	/*function* stringify(properties: Style.Properties, indent: number = 0): Generator<string, void, void> {
		const padding = '\t'.repeat(indent);

		for (const [key, value] of Object.entries(properties)) {
			if (value === undefined) {
				continue;
			};

			yield `${padding}${key}: ${value};\n`;
		};
	};

	export function* generateStyles(config: Style): Generator<string, void, void> {
		yield `:host {\n`;

		yield `\ttext-decoration: none;`;

		if (config.base !== undefined) {
			yield* stringify(config.base, 1);
		};

		if (config.before !== undefined) {
			yield `\t&::before {\n`;
			yield* stringify(config.before, 2);
			yield `\t}\n`;
		};

		if (config.after !== undefined) {
			yield `\t&::after {\n`;
			yield* stringify(config.after, 2);
			yield `\t}\n`;
		};

		yield `}\n`;

		// TODO: ...
	};*/
};