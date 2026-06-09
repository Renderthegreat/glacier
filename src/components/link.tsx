import { Component, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';
import { Shadow, } from '#~/components.tsx';

export type LinkConfig = {
	reference: string,
} & CommonConfig;
/**
 * TODO: Documentation.
 */
export const Link = primitive<LinkConfig>((component) => {
	return component;
}, Symbol('glacier-anchor'));