import { primitive, } from '#~/index.ts';
import { CommonConfig, } from '#~/common.tsx';

export type MainConfig = {} & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main HTMLMainElement}.
 */
export const Main = primitive<MainConfig>((component) => {
	return component;
}, Symbol('main'));
