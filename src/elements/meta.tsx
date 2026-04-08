import { Component, ComponentFactory, ComponentConfig, } from 'rynth';

import { CommonAttributes } from '#~/common';

export type MetaAttributes = {
	name: string,
};
/**
 * Meta data for the page.
 */
export class Meta implements ComponentFactory<MetaAttributes> {
	public readonly symbol: symbol = Symbol('meta');

	public of(config: ComponentConfig<MetaAttributes>): Component<any> {
		if (config.name == 'title') {
			// I hate how this works.
			return new Component(Symbol('title'), {
				children: config.children,
			});
		};

		const newConfig: ComponentConfig<MetaAttributes & {
			value: string,
		}> = {
			name: config.name,
			value: String(config.children[0]),

			children: [],
		};

		return new Component(this.symbol, newConfig);
	};
};