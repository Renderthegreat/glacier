import * as Rynth from 'rynth';
/**
 * Provides a truly secure place for information such as passwords, credentials, and other sensitive data.
 * **This class is not safe from *XSS*, as a fake {@link Sealed} class can be created to capture the data.**
 * However, it is safe to pass this instance anywhere.
 */
export class Sealed {
    static {
        Object.freeze(this);
        Object.freeze(this.prototype);
    }
    ;
    static LockedError = class LockedError extends Error {
        constructor() {
            super("`secret` is locked.");
        }
        ;
    };
    #signal;
    #locked = false;
    constructor(value) {
        if (value instanceof Rynth.Signal) {
            this.#signal = value;
        }
        else {
            this.#signal = Rynth.signal(value);
        }
        ;
        Object.freeze(this);
    }
    ;
    /**
     * This function only works **once**.
     *
     */
    map(func) {
        if (this.#locked || this.#locked === undefined) {
            throw new Sealed.LockedError();
        }
        ;
        this.#locked = true;
        return new Sealed(this.#signal.map(func));
    }
    ;
    set value(value) {
        this.#signal.value = value;
    }
    ;
}
;
