import { Component } from 'rynth';

import { componentFunction, } from '#~/index.ts';
import { CommonConfig, } from '#~/common.tsx';

export type IsolatedConfig = {
	readonly url: string,
} & CommonConfig;
export const Isolated = componentFunction<IsolatedConfig>((config) => {
	// TODO: ...
	return "TODO" as any;
});
