import { Component, } from 'rynth';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div HTMLDivElement}.
 */
export class Div {
    symbol = Symbol('div');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
