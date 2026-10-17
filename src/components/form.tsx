import * as Rynth from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type FormConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form HTMLFormElement}.
 */
export const Form = primitive<FormConfig>((component) => {
	return component;
}, Symbol('form'));