import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { primitive, } from '#~/index';

export type SpanAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span HTMLSpanElement}.
 */
export const Span = primitive<SpanAttributes>((component) => {
	return component;
}, Symbol('span'));