import { Component, } from 'rynth';
/**
 * Meta data for the page.
 */
export class Meta {
    symbol = Symbol('meta');
    of(config) {
        if (config.name == 'title') {
            // I hate how this works.
            return new Component(Symbol('title'), {
                children: config.children,
            });
        }
        ;
        const newConfig = {
            name: config.name,
            value: String(config.children[0]),
            children: [],
        };
        return new Component(this.symbol, newConfig);
    }
    ;
}
;
