import { Fragment as _Fragment, jsx as _jsx } from "rynth/jsx-runtime";
import { Component, Signal, } from 'rynth';
import { componentFunction, } from '#~/index';
export const Show = componentFunction((config) => {
    const { when, } = config;
    const child = _jsx(_Fragment, {});
    child.config.children = config.children;
    const childSignal = new Signal(null);
    // TODO: Use custom `Slot` element, and use the *Shadow DOM*.
    const wrapper = new Component({
        ...config,
        children: [childSignal],
    }, Symbol('slot'));
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
});
