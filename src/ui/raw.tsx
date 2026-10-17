import { Component, ComponentConfig, Signal, } from 'rynth';

import { primitive, } from '#~/index.ts';

import * as G from '#~/components.tsx';

import { Binding, } from '#~/binding.ts';
import { CommonConfig } from '#~/common.tsx';

export const Raw = primitive<Binding<Element> & CommonConfig>((component) => {
	component.lifecycle.on('mount', ({ node: host, }: { node: Element, }) => {
		host.innerHTML = ``;

		component.config['bind:value'].subscribe((element: Element) => {
			host.appendChild(element);
		});

		host.appendChild(component.config['bind:value'].valueOf());
	});

	return component;
}, Symbol('span'));