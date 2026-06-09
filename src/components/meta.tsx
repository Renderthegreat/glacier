import { Component, ComponentFactory, ComponentConfig, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';

export type MetaConfig = {
	name: string,
};
/**
 * Meta data for the page.
 */
export class Meta implements ComponentFactory<MetaConfig> {
	public readonly symbol: symbol = Symbol('meta');

	public of(config: ComponentConfig<MetaConfig>): Component<any> {
		if (config.name == 'title') {
			// I hate how this works.
			return new Component({
				children: config.children,
			}, Symbol('title'));
		};

		const newConfig: ComponentConfig<MetaConfig & {
			value: string,
		}> = {
			name: config.name,
			value: String(config.children[0]),

			children: [],
		};

		return new Component(newConfig, this.symbol);
	};
};