import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { primitive, } from '#~/index';

export type BodyAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body HTMLBodyElement}.
 */
export const Body = primitive<BodyAttributes>((component) => {
	return component;
}, Symbol('body'));