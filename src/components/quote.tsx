import { primitive, } from '#~/index.ts';
import { CommonConfig, } from '#~/common.tsx';

// TODO: ...
export type QuoteConfig = {

} & CommonConfig;

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q HTMLQuoteElement}.
 */
export const Quote = primitive<QuoteConfig>((component) => {
	return component;
}, Symbol('q'));
