import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common';
import { On, } from '#~/APIs/trigger';
import { primitive, } from '#~/index';

export type ButtonAttributes = { } & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button HTMLButtonElement}.
 */
export const Button = primitive<ButtonAttributes>((component) => {
	return component;
}, Symbol('button'));