import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';
import { Shadow, } from '#~/components.tsx';

export type LinkAttributes = {
	reference: string,
} & CommonAttributes;
/**
 * TODO: Documentation.
 */
export const Link = primitive<LinkAttributes>((component) => {
	return component;
}, Symbol('glacier-anchor'));