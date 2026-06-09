import { primitive, } from '#~/index.ts';

import { CommonConfig, } from '#~/common.tsx';

export type NavigationConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav HTMLNavElement}.
 */
export const Navigation = primitive<NavigationConfig>((component) => {
	return component;
}, Symbol('nav'));