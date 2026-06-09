import { Component, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';
import { On, } from '#~/APIs/trigger.ts';
import { primitive, } from '#~/index.ts';

export type ButtonConfig = { } & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button HTMLButtonElement}.
 */
export const Button = primitive<ButtonConfig>((component) => {
	return component;
}, Symbol('button'));