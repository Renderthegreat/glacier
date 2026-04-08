import clone from 'clone-deep';
import { Component, Signal, } from 'rynth';
export class Show {
    symbol = Symbol('');
    of(config) {
        const whenSignal = config.when;
        const componentSignal = new Signal(null);
        // Ensure we don't destroy the real `config` on unmount.
        const getNewConfig = () => {
            return clone(config);
        };
        const wrapper = new Component(this.symbol, {
            ...config,
            children: [
                componentSignal
            ],
        });
        // Subscribe to `whenSignal` and update the inner component.
        const unsubscribe = whenSignal.subscribe((value) => {
            console.log(`Show: ${value}.`);
            if (value) {
                componentSignal.value = new Component(this.symbol, getNewConfig());
            }
            else {
                componentSignal.value?.lifecycle.emit('unmount');
                componentSignal.value = null;
            }
            ;
        });
        wrapper.lifecycle.addCleanupTask(unsubscribe);
        // Initialize based on current value.
        if (whenSignal.value) {
            componentSignal.value = new Component(this.symbol, getNewConfig());
        }
        ;
        return wrapper;
    }
    ;
}
;
