import * as Rynth from 'rynth';

import { ApplyOn, } from '#~/APIs/trigger.ts';

export type CommonConfig = {
	readonly id?: string,
	readonly class?: string,
	readonly name?: string,

	// TODO: ...
	// tabindex?: number,
	
	style?: CSSStyleSheet,
} & ApplyOn;