import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { primitive, } from '#~/index';
import { Shadow, } from '#~/components';

export type LinkAttributes = {
	reference: string,
} & CommonAttributes;
/**
 * TODO: Documentation.
 */
export const Link = primitive<LinkAttributes>((component) => {
	return component;
}, Symbol('glacier-anchor'));