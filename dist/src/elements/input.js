import { Component, } from 'rynth';
import { IronEnum, } from 'iron-enum';
export const InputData = IronEnum();
export const InputType = IronEnum();
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input HTMLInputElement}.
 * TODO: Add all input types. Also, make it possible to add new input types!
 */
export class Input {
    symbol = Symbol('input');
    of(config) {
        let newConfig = {
            children: config.children,
        };
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
    }
    ;
}
;
