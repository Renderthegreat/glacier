import { Component, } from 'rynth';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style HTMLStyleElement}.
 */
export class Style {
    symbol = Symbol('style');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
