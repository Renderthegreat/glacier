import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { primitive, } from '#~/index';

export type HeadAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head HTMLHeadElement}.
 */
export const Head = primitive<HeadAttributes>((component) => {
	return component;
}, Symbol('head'));