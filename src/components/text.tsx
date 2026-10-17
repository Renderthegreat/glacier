import { Component, } from 'rynth';

import type { CommonConfig, } from '#~/common.tsx';
import { componentFunction, } from '#~/index.ts';

export enum TextHeaderLevel {
	H1 = 'h1',
	H2 = 'h2',
	H3 = 'h3',
	H4 = 'h4',
	H5 = 'h5',
	H6 = 'h6',
};

export type TextDecoration = {
	bold: boolean,
	italic: boolean,
	// TODO: ...
};

export type TextConfig = {
	level?: TextHeaderLevel,

} & CommonConfig /*& Binding<string>*/;
export const Text = componentFunction<TextConfig>((config) => {
	const component = new Component({
		...config,
		children: config.children,
	}, Symbol('glacer-text'));

	return component;
});