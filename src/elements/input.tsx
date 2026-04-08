import { Component, ComponentFactory, ComponentConfig, } from 'rynth';

import { IronEnum, } from 'iron-enum';

import Color from 'colorjs.io';

import { CommonAttributes, } from '#~/common';

import { Time, } from '#~/APIs/time';

export const InputData = IronEnum<{
	Text: string,
	Password: string,
	Email: string,
	Number: number,
	CheckBox: boolean,
	Radio: boolean,
	// TODO: Add file type.
	File: any,
	Hidden: string,
	Search: string,
	Telephone: `${number}+${number}-${number}-${number}`,
	// TODO: Add URL type.
	URL: string,
	Time: Time,
	Color: Color,
}>();

export const InputType = IronEnum<{
	[Key in (typeof InputData._.typeTags)]: undefined;
}>();

export type InternalInputAttributes = {
	type: typeof InputType._.typeOf,
	value: typeof InputData._.typeOf,
	children: string[],
};

export type InputAttributes = {
	type: typeof InputType._.typeOf,
} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input HTMLInputElement}.
 * TODO: Add all input types. Also, make it possible to add new input types!
 */
export class Input implements ComponentFactory<InputAttributes> {
	public symbol: symbol = Symbol('input');

	public of(config: ComponentConfig<InputAttributes>): Component<InternalInputAttributes> {
		let newConfig: InternalInputAttributes = {
			children: config.children,
		} as InternalInputAttributes;

		config.type.match({
			Text: () => {
				newConfig.type = InputType.Text();
			},
			Password: () => {
				newConfig.type = InputType.Password();
			},
			Email: () => {
				newConfig.type = InputType.Email();
			},
			Number: () => {
				newConfig.type = InputType.Number();
			},
			CheckBox: () => {
				newConfig.type = InputType.CheckBox();
			},
			Radio: () => {
				newConfig.type = InputType.Radio();
			},
			File: () => {
				newConfig.type = InputType.File();
			},
			Hidden: () => {
				newConfig.type = InputType.Hidden();
			},
			Search: () => {
				newConfig.type = InputType.Search();
			},
			Telephone: () => {
				newConfig.type = InputType.Telephone();
			},
			URL: () => {
				newConfig.type = InputType.URL();
			},
			Time: () => {
				newConfig.type = InputType.Time();
			},
			Color: () => {
				newConfig.type = InputType.Color();
			},
		});

		return new Component(this.symbol, newConfig);
	};
};