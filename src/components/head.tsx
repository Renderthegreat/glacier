import { Component, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type HeadConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head HTMLHeadElement}.
 */
export const Head = primitive<HeadConfig>((component) => {
	return component;
}, Symbol('head'));