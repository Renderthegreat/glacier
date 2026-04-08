import { Component, } from 'rynth';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bR HTMLBRElement}.
 */
export class Break {
    symbol = Symbol('br');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
