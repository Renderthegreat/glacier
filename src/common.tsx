import * as Rynth from 'rynth';

import { ApplyOn, } from '#~/APIs/trigger.ts';

export type CommonConfig = {
	// TODO: Move these 2.
	id?: string,
	class?: string,
	
	style?: CSSStyleSheet,
} & ApplyOn;