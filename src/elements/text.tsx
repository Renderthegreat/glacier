import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { Binding, } from '#~/binding';
import { componentFunction, } from '#~/index';

export type TextAttributes = {} & CommonAttributes & Binding<string>;
export const Text = componentFunction<TextAttributes>((config) => {
	const signal = config['bind:value'] || config.children.join();

	const component = new Component({
		...config,
		children: [signal],
	}, Symbol('glacer-text'));

	return component;
});