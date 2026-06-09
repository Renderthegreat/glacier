import * as G from '#~/components.tsx';
import { componentFunction, } from '#~/index.ts';

export const EpicText = componentFunction<{}>((config) => {
	// TODO: Handle incorrect types with *Glacier*.

	const words = (config.children[0] as string).split(/([\s\.])/);

	let index = 1;

	function generateStyleSheets(index: number, emphasis: boolean): CSSStyleSheet {
		const sheet = new CSSStyleSheet;

		sheet.replaceSync(`
			:host {
				--index: ${index};
				--color: ${emphasis ? 'var(--primary-color)' : 'var(--foreground-color)'};
			}
		`);

		return sheet;
	};

	return <G.Span class='epic-text'>{
		words.map((word) => {
			return <G.Text style={generateStyleSheets(index++, word[0] === '^')}>{word.replace(/\^/g, '')}</G.Text>;
		})
	}</G.Span>;
});