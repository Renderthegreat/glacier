import * as Rynth from 'rynth';

import { Cursor, } from '#~/APIs/cursor';

// TODO: Use `Trigger` types.
type OnKeys = {
	click: () => void;
	load: () => void;
	// TODO: ....
};

export type On = {
	[Key in keyof OnKeys]?: Rynth.Value<OnKeys[Key]>;
};

export type ApplyOn = {
	[Key in keyof OnKeys as `on:${Key}`]?: Rynth.Value<OnKeys[Key]>;
};

export namespace On {
	export type Click = {
		position: Rynth.Signal<Cursor.Position>,
	};

	export function setup(element: HTMLElement, config: ApplyOn): void {
		(Object.keys(config) as Array<keyof ApplyOn>).forEach((key) => {
			if (config[key] !== undefined && key.match(/^on\:/)) {
				// ! `toLowerCase` usage may be trivial.
				element.addEventListener(key.replace('on:', '').toLowerCase() as keyof HTMLElementEventMap, Rynth.unwrap(config[key]));
			};
		});
	};

	/*export function quickWrapListener<Data>(func: (legacyEvent: Event) => void): (event: Triggered<Data>) => void {
		return (event: Triggered<Data>) => {
			// func();
		};
	};*/
};


// TODO:	
export type Triggered<Data> = {

};