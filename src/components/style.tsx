import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type StyleAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style HTMLStyleElement}.
 */
export const Style = primitive<StyleAttributes>((component) => {
	return component;
}, Symbol('style'));