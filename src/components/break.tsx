import { Component, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type BreakConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bR HTMLBRElement}.
 */
export const Break = primitive<BreakConfig>((component) => {
	return component;
}, Symbol('br'));