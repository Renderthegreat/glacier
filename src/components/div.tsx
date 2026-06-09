import { Component, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type DivConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div HTMLDivElement}.
 */
export const Div = primitive<DivConfig>((component) => {
	return component;
}, Symbol('div'));