import * as Rynth from 'rynth';

import { componentFunction, } from '#~/index.ts';

import { CommonConfig, } from '#~/common.tsx';

export type DisconnectedConfig = {
	readonly key: unique symbol;
} & CommonConfig;

export const Disconnected = componentFunction<DisconnectedConfig>((config) => {
	return new Rynth.Component<DisconnectedConfig>(config);
});