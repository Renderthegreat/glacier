import * as Rynth from 'rynth';

import { Cursor, } from '#~/APIs/cursor';

// TODO: Use `Trigger` types.
type OnKeys = {
	click: () => void;
	load: () => void;
	// TODO: ....
};

export type On = {
	[Key in keyof OnKeys as `on:${Key}`]?: Rynth.Value<OnKeys[Key]>;
};

export namespace On {
	export type Click = {
		position: Rynth.Signal<Cursor.Position>,
	};

	export function setup(element: HTMLElement, config: On): void {
		(Object.keys(config) as Array<keyof On>).forEach((key) => {
			if (config[key] !== undefined && key.match(/^on\:/)) {
				// `toLowerCase` usage may be trivial.
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