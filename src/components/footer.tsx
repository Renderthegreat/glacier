import { primitive, } from '#~/index.ts';
import { CommonConfig, } from '#~/common.tsx';

export type FooterConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer HTMLFooterElement}.
 */
export const Footer = primitive<FooterConfig>((component) => {
	return component;
}, Symbol('footer'));
