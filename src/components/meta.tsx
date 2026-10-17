import { Component, } from 'rynth';

import { componentDynamicFunction, } from '#~/index.ts';

export type MetaConfig = {
	readonly name: string,
} /* TODO: Remove? */;
/**
 * Meta-data for the page.
 */
export const Meta = componentDynamicFunction<MetaConfig>((config) => {
	// This sucks, but this isn't my decision.
	// TODO: When this is fix-able, fix it.
	if (config.name === 'title') {
		return new Component(config, Symbol('title'));
	};

	return new Component(config, Symbol('meta'));
});