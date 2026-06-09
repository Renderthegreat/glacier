import { primitive, } from '#~/index.ts';
import type { CommonConfig } from '#~/common.tsx';

// TODO: Add ARIA support.
export type ImageConfig = {
	src: string,
} & CommonConfig;

export const Image = primitive<ImageConfig>((component) => {
	return component;
}, Symbol('img'))