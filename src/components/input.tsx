import * as Rynth from 'rynth';

import { IronEnum, } from 'iron-enum';

import { CommonConfig, } from '#~/common.tsx';

import { Binding, } from '#~/binding.ts';

import { Time, } from '#~/APIs/time.ts';

export enum InputType {
	Text = 'text',
	Password = 'password',
	Email = 'email',
	Number = 'number',

	Search = 'search',
	CheckBox = 'checkbox',
	// Radio: boolean,
	// // TODO: Add file type.
	File = 'file',
	// Hidden: string,
	// Search: string,
	// Telephone: `${number}+${number}-${number}-${number}`,
	// // TODO: Add URL type.
	// URL: string,
	// Time: Time,
	// // Color: Color,
};

type Writeable<T> = {
	-readonly [P in keyof T]: T[P];
};

export type InternalInputConfig = Writeable<InputConfig>;

export type InputConfig = {
	readonly type: InputType,

	readonly placeholder?: Rynth.Value<any>,
	// TODO: ...
	// children: string[],
} & CommonConfig & Binding<any/* TODO: Constrict types. */>;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input HTMLInputElement}.
 * TODO: Add all input types. Also, make it possible to add new input types!
 */
export class Input implements Rynth.ComponentFactory<InputConfig> {
	public symbol: symbol = Symbol('input');

	public of(config: Rynth.ComponentConfig<InputConfig>): Rynth.Component<InputConfig> {
		const newConfig: Rynth.ComponentConfig<InternalInputConfig> = {
			...config,
			children: config.children,
		};

		const component = new Rynth.Component(newConfig, this.symbol);

		component.lifecycle.on('mount', ({ node: element, }: { node: HTMLInputElement, }) => {
			// FIX: Triggered twice due to duo mount bug.
			console.log('Input was mounted!');

			if (component.config['bind:value']) {
				switch (config.type) {
					case InputType.CheckBox: {
						element.checked = component.config['bind:value'].value != '';
						break;
					};
					case InputType.File: {
						// ? Should we change this?
						break;
					};
					default: {
						element.value = component.config['bind:value'].value || '';
						break;
					};
				};

				
			};

			component.config['bind:value'].map((value) => {
				switch (config.type) {
					case InputType.CheckBox: {
						element.checked = component.config['bind:value'].value != '';
						break;
					};
					case InputType.File: {
						// ? Should we change this?
						break;
					};
					default: {
						element.value = component.config['bind:value'].value || '';
						break;
					};
				};
			});

			// TODO: Optimize.
			element.addEventListener('input', (event) => {
				switch (config.type) {
					case InputType.CheckBox: {
						component.config['bind:value'].value = element.checked;
						break;
					};
					case InputType.File: {
						component.config['bind:value'].value = element.files;
						break;
					};
					default: {
						component.config['bind:value'].value = element.value;
						break;
					};
				};
			});
		});
		

		return component;
	};
};