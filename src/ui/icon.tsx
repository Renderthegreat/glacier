import { Component, } from 'rynth';

import { componentFunction, } from '#~/index.ts';

import type { CommonConfig, } from '#~/common.tsx';

import * as G from '#~/components.tsx';

export type IconConfig = {} & CommonConfig;
export const Icon = componentFunction<IconConfig>((config) => {
	// TODO: ....
	const image = <G.Image src=''></G.Image>;
	
	return image;
});