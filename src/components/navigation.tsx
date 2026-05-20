import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common.tsx';
import { primitive, } from '#~/index.ts';

export type NavigationAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav HTMLNavElement}.
 */
export const Navigation = primitive<NavigationAttributes>((component) => {
	return component;
}, Symbol('nav'));