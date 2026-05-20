import { Component, } from 'rynth';

import { CommonAttributes, } from '#~/common.tsx';
import { On, } from '#~/APIs/trigger.ts';
import { primitive, } from '#~/index.ts';

export type ButtonAttributes = { } & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button HTMLButtonElement}.
 */
export const Button = primitive<ButtonAttributes>((component) => {
	return component;
}, Symbol('button'));