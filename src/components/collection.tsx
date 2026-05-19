import * as Rynth from 'rynth';

import { CommonAttributes, } from '#~/common';
import { Binding, } from '#~/binding';
import { componentFunction, } from '#~/index';

import { Disconnected, } from '#~/components/disconnected';

/**
 * Items bound must strictly be {@link Disconnected}.
 */
export type CollectionAttributes =
	CommonAttributes & 
	Required<Binding<readonly (Rynth.Component)[]>> &
	{}
;

/*class ReactiveArray<T> extends Array<T> {
	public constructor(items: T[]) {
		super(...items);

		return new Proxy
	};
};*/

/*export const Collection = 
	componentFunction<CollectionAttributes>((config) => {
		const { 'bind:value': signal, } = config;

		const keyMap: Map<number, symbol> = new Map();
		const componentMap: WeakMap<symbol, Rynth.Component> = new WeakMap();

		for (const [index, item] of signal.value.entries()) {
			const key = Symbol();

			keyMap.set(index, key);
			componentMap.set(key, item);
		};

		const component = <></>;

		let componentNode: Node | null = null;

		component.lifecycle.on('mount', ({ node: node, }: { node: Node; }) => {
			componentNode = node;
		});

		// const reactiveArray = 
	})
;*/