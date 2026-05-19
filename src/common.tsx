import * as Rynth from 'rynth';

import { ApplyOn, } from '#~/APIs/trigger';

export type CommonAttributes = {
	// TODO: Move these 2.
	id?: string,
	class?: string,
	
	style?: CSSStyleSheet,
} & ApplyOn;