import { Component, } from 'rynth';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head HTMLHeadElement}.
 */
export class Head {
    symbol = Symbol('head');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
