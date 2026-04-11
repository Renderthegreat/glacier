import * as Rynth from 'rynth';

export type OnKeys = {
	click?: Rynth.Value<() => void>,
	// ...
};

export type On = {
	[Key in keyof OnKeys as `on:${Key}`]?: Rynth.Value<OnKeys[Key]>;
};

export function setup(element: HTMLElement, config: On) {
	element.addEventListener('click', Rynth.unwrap(config['on:click']));
};