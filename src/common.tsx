import { Value, } from 'rynth';

import { On, } from '#~/on';

export type CommonAttributes = {
	id?: string,
	style?: Value<string>,
} & On;