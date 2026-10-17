import { primitive, } from '#~/index.ts';
import { CommonConfig, } from '#~/common.tsx';

import { QuoteConfig, } from '#~/components/quote.tsx';

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote HTMLQuoteElement}.
 */
export const BlockQuote = primitive<QuoteConfig>((component) => {
	return component;
}, Symbol('blockquote'));
