import { Component, } from 'rynth';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body HTMLBodyElement}.
 */
export class Body {
    symbol = Symbol('body');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
