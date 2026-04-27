import * as Rynth from 'rynth';

type BindingKeys<T> = {
	value: Rynth.Signal<T>,
};

export type Binding<T> = {
	[Key in keyof BindingKeys<T> as `bind:${Key}`]?: BindingKeys<T>[Key];
};