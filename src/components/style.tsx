import { primitive, } from '#~/index.ts';
import type { CommonConfig, } from '#~/common.tsx';

export type StyleConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style HTMLStyleElement}.
 */
export const Style = primitive<StyleConfig>((component) => {
	return component;
}, Symbol('style'));