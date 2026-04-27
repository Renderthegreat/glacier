import { Component, ComponentConfig, Child, Signal, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { componentFunction, } from '#~/index';

export type ShowAttributes = {
	when: Signal<boolean>;
} & CommonAttributes;
export const Show = componentFunction<ShowAttributes>((config) => {
	const { when, } = config;

	const child = <></>;
	child.config.children = config.children;

	const childSignal = new Signal<Child>(null);

	// TODO: Use custom `Slot` element.
	const wrapper = new Component({
		...config,
		children: [childSignal],
	}, Symbol('slot'));

	const unsubscribe = when.subscribe((value) => {
		if (value) {
			childSignal.value = child;
		} else {
			childSignal.value = null;
		};
	});

	wrapper.lifecycle.on('unmount', () => {
		unsubscribe();
	});

	if (when.value) {
		childSignal.value = child;
	};

	return wrapper;
});
/*export class Show implements ComponentFactory<ShowAttributes> {
	public readonly symbol: symbol = Symbol('slot');

	// TODO: To clone or not to clone, that is the question.
	public of(config: ComponentConfig<ShowAttributes>): Component<ShowAttributes> {
		const { when, } = config;

		const child = <></>;
		child.config.children = config.children;

		const childSignal = new Signal<Child>(null);

		const wrapper = new Component({
			...config,
			children: [childSignal],
		}, this.symbol);

		const unsubscribe = when.subscribe((value) => {
			if (value) {
				childSignal.value = child;
			} else {
			 	childSignal.value = null;
			};
		});

		wrapper.lifecycle.on('unmount', () => {
			unsubscribe();
		});

		if (when.value) {
			childSignal.value = child;
		};

		return wrapper;
	};
};*/