import { Component, ComponentFactory, ComponentConfig, Child, Signal, } from 'rynth';

export type ShowAttributes = {
	when: Signal<boolean>;
};
export class Show implements ComponentFactory<ShowAttributes> {
	public readonly symbol: symbol = Symbol('slot');

	// TODO: To clone or not to clone, that is the question.
	public of(config: ComponentConfig<ShowAttributes>): Component<ShowAttributes> {
		const { when, } = config;

		const child = <></>;
		child.config.children = config.children;

		const childSignal = new Signal<Child>(null);

		const wrapper = new Component(this.symbol, {
			...config,
			children: [childSignal],
		});

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
};