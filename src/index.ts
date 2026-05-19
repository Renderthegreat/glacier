import * as Rynth from 'rynth';

import { CommonAttributes, } from '#~/common';

import { On, } from '#~/APIs/trigger';
import { Style, } from '#~/APIs/styles';

import { Class, } from 'type-fest';

function setupComponent(component: Rynth.Component<any>): void {
	// Attach the click listener directly to the rendered button element to avoid nested bridge/event-target issues.
	component.lifecycle.on('mount', ({ node, }: { node: Node, }) => {
		if (node.nodeType == Node.ELEMENT_NODE) {
			const element = node as HTMLElement;
	
			On.setup(element, component.config);
			Style.setup(element, component.config.style);

			return;
		};

		if (node.childNodes.length == 1) {
			// setupComponent(node.childNodes[0]);
		};
	});
};

export function componentFunction<C extends CommonAttributes, T = object>(
	func: (config: Rynth.ComponentConfig<C>) => Rynth.Component,
	base: Class<T> = class {} as Class<T>,
): Class<(Rynth.ComponentFactory<C>) & Class<T>> {

	const factory = class extends (base as any) implements Rynth.ComponentFactory<C> {
		public of(config: Rynth.ComponentConfig<C>): Rynth.Component<any> {
			const component = func(config);

			setupComponent(component);

			return component;
		};
	};

	return factory as any;
};

export function primitive<C extends CommonAttributes>(func: (config: Rynth.Component<C>) => Rynth.Component, key: symbol): Class<Rynth.ComponentFactory<C>> {
	return class implements Rynth.ComponentFactory<C> {
		public readonly symbol: symbol = key;

		public of(config: Rynth.ComponentConfig<C>): Rynth.Component<any> {
			const component = func(new Rynth.Component(config, key));

			setupComponent(component);

			return component;
		};
	};
};