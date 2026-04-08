import deepClone from '@lodash.clonedeep';

import { Component, ComponentFactory, ComponentConfig, Signal, } from 'rynth';

export type ShowAttributes = {
	when: Signal<boolean>;
};
export class Show implements ComponentFactory<ShowAttributes> {
	public readonly symbol: symbol = Symbol('');

	public of(config: ComponentConfig<ShowAttributes>): Component<ShowAttributes> {
		const whenSignal: Signal<boolean> = config.when;
		const componentSignal: Signal<Component | null> = new Signal<Component | null>(null);

		// Ensure we don't destroy the real `config` on unmount.
		const getNewConfig: () => ComponentConfig<ShowAttributes> = () => {
			return clone(config);
		};

		const wrapper: Component<ShowAttributes> = new Component<ShowAttributes>(this.symbol, {
			...config,
			children: [
				componentSignal
			],
		});

		// Subscribe to `whenSignal` and update the inner component.
		const unsubscribe = whenSignal.subscribe((value: boolean) => {
			console.log(`Show: ${value}.`);

			if (value) {
				componentSignal.value = new Component(this.symbol, getNewConfig());
			} else {
				componentSignal.value?.lifecycle.emit('unmount');
				componentSignal.value = null;
			};
		});

		wrapper.lifecycle.addCleanupTask(unsubscribe);

		// Initialize based on current value.
		if (whenSignal.value) {
			componentSignal.value = new Component(this.symbol, getNewConfig());
		};

		return wrapper;
	};
};