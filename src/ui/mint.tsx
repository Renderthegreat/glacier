import * as Rynth from 'rynth';
import { Component, ComponentConfig, } from 'rynth';

import { componentFunction, } from '#~/index.ts';

import * as G from '#~/components.tsx';

import * as UI from '@glacier/glacier/ui';

import { CommonConfig, } from '#~/common.tsx';

import * as MD from 'marked';

// TODO: Update.

export type MintConfig = {
	// TODO: ...
	slots: Record<string, Component>,
} & CommonConfig;
/**
 * Render *Markdown*.
 */
export const Mint = componentFunction<MintConfig>((config: ComponentConfig<MintConfig>) => {
	for (const child in config.children) {
		// TODO: Add `Signal<string>` support?
		// It would require a *Markdown* stream pipeline.
		if (typeof child !== 'string') {
			// TODO: Handle with *Glacier*.
			console.error('Mint component cannot have anything other than a string in it.');
	
			return undefined!;
		};
	};

	const parsed: string[] = (config.children as string[]) // Safe assertion.
		.map((child: string) => MD.parse(child) as string)
	;
	const raw = parsed[0];

	const parser = new DOMParser();

	const doc = parser.parseFromString(raw, 'text/html');

	return <UI.Raw bind:value={Rynth.signal(doc.body! as Element)}></UI.Raw>;
});