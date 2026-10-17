import { primitive, } from '#~/index.ts';
import { CommonConfig, } from '#~/common.tsx';

export type HeaderConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header HTMLHeaderElement}.
 */
export const Header = primitive<HeaderConfig>((component) => {
	return component;
}, Symbol('header'));
