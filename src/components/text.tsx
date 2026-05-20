import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common.tsx';
import { Binding, } from '#~/binding.ts';
import { componentFunction, } from '#~/index.ts';

export type TextAttributes = {} & CommonAttributes & Binding<string>;
export const Text = componentFunction<TextAttributes>((config) => {
	const signal = config['bind:value'] || config.children.join();

	const component = new Component({
		...config,
		children: [signal],
	}, Symbol('glacer-text'));

	return component;
});