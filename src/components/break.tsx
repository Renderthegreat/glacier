import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type BreakAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bR HTMLBRElement}.
 */
export const Break = primitive<BreakAttributes>((component) => {
	return component;
}, Symbol('br'));