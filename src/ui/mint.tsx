import { Component, ComponentConfig, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { componentFunction, } from '#~/index.ts';

import * as MD from 'libmd';

export type MintConfig = {
	slots: Record<string, Component>,
} & CommonConfig;
/**
 * Render *Markdown*.
 */
export const Mint = componentFunction<MintConfig>((config: ComponentConfig<MintConfig>) => {
	for (const child in config.children) {
		// TODO: Add `Signal<string>` support.
		if (typeof child !== 'string') {
			// TODO: Handle with *Glacier*.
			console.error('Mint component cannot have anything other than a string in it.');
	
			return undefined!;
		};
	};

	const parsed: MD.Document[] = (config.children as string[]) // Safe assertion.
		.map((child: string) => MD.parser.parse(child))
	;

	console.log(parsed);

	return <>{JSON.stringify(parsed.map((parsed) => parsed.toJSON()))}</>;

});