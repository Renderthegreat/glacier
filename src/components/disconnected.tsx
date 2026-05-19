import * as Rynth from 'rynth';

import { componentFunction, } from '#~/index';

import { CommonAttributes, } from '#~/common';

export type DisconnectedAttributes = {
	readonly key: unique symbol;
} & CommonAttributes;

export const Disconnected = componentFunction<DisconnectedAttributes>((config) => {
	return new Rynth.Component<DisconnectedAttributes>(config);
});