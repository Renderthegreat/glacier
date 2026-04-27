import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { primitive, } from '#~/index';

export type HeaderAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header HTMLHeaderElement}.
 */
export const Header = primitive<HeaderAttributes>((component) => {
	return component;
}, Symbol('header'));
