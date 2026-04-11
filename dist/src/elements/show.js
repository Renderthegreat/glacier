import { Fragment as _Fragment, jsx as _jsx } from "rynth/jsx-runtime";
import { Component, Signal, } from 'rynth';
export class Show {
    symbol = Symbol('slot');
    // TODO: To clone or not to clone, that is the question.
    of(config) {
        const { when, } = config;
        const child = _jsx(_Fragment, {});
        child.config.children = config.children;
        const childSignal = new Signal(null);
        const wrapper = new Component(this.symbol, {
            ...config,
            children: [childSignal],
        });
        const unsubscribe = when.subscribe((value) => {
            if (value) {
                childSignal.value = child;
            }
            else {
                childSignal.value = null;
            }
            ;
        });
        wrapper.lifecycle.on('unmount', () => {
            unsubscribe();
        });
        if (when.value) {
            childSignal.value = child;
        }
        ;
        return wrapper;
    }
    ;
}
;
