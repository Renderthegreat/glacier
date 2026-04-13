import * as Rynth from 'rynth';

import { On, } from '#~/APIs/trigger';

export type CommonAttributes = {
	id?: string,
	style?: Rynth.Value<string>,
} & On;