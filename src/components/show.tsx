import { Component, ComponentConfig, Child, Signal, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { componentFunction, } from '#~/index.ts';

export type ShowConfig = {
	when: Signal<boolean>;
} & CommonConfig;
export const Show = componentFunction<ShowConfig>((config) => {
	const { when, } = config;

	const child = <></>;
	child.config.children = config.children;

	const childSignal = new Signal<Child>(null);

	// TODO: Use custom `Slot` element, and use the *Shadow DOM*.
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
/*export class Show implements ComponentFactory<ShowConfig> {
	public readonly symbol: symbol = Symbol('slot');

	// TODO: To clone or not to clone, that is the question.
	public of(config: ComponentConfig<ShowConfig>): Component<ShowConfig> {
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