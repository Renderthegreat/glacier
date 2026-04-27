import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { primitive, } from '#~/index';

export type NavigationAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav HTMLNavElement}.
 */
export const Style = primitive<NavigationAttributes>((component) => {
	return component;
}, Symbol('span'));