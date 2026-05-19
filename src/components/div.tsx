import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { primitive, } from '#~/index';

export type DivAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div HTMLDivElement}.
 */
export const Div = primitive<DivAttributes>((component) => {
	return component;
}, Symbol('div'));