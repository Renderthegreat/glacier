import { Component, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type BodyConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body HTMLBodyElement}.
 */
export const Body = primitive<BodyConfig>((component) => {
	return component;
}, Symbol('body'));