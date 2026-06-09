import { primitive, } from '#~/index.ts';

import type { CommonConfig, } from '#~/common.tsx';

export type SpanConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span HTMLSpanElement}.
 */
export const Span = primitive<SpanConfig>((component) => {
	return component;
}, Symbol('span'));