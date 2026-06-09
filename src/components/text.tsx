import { Component, } from 'rynth';

import type { CommonConfig, } from '#~/common.tsx';
import { componentFunction, } from '#~/index.ts';

export type TextConfig = {} & CommonConfig /*& Binding<string>*/;
export const Text = componentFunction<TextConfig>((config) => {
	const signal =  config.children.join();

	const component = new Component({
		...config,
		children: [signal],
	}, Symbol('glacer-text'));

	return component;
});