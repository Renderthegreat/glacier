import * as Rynth from 'rynth';

import { componentFunction, } from '#~/index.ts';

import { CommonAttributes, } from '#~/common.tsx';

export type DisconnectedAttributes = {
	readonly key: unique symbol;
} & CommonAttributes;

export const Disconnected = componentFunction<DisconnectedAttributes>((config) => {
	return new Rynth.Component<DisconnectedAttributes>(config);
});