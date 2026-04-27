import * as Rynth from 'rynth';

/**
 * Provides a truly secure place for information such as passwords, credentials, and other sensitive data.
 * **This class is not safe from *XSS*, as a fake {@link Sealed} class can be created to capture the data.**
 * However, it is safe to pass this instance anywhere.
 */
export class Sealed<T> {
	static {
		Object.freeze(this);
		Object.freeze(this.prototype);
	};

	public static LockedError = class LockedError extends Error {
		public constructor() {
			super("`secret` is locked.");
		};
	};

	#signal: Rynth.Signal<T>;
	
	#locked: boolean = false;

	public constructor(value: Rynth.Value<T>) {
		if (value instanceof Rynth.Signal) {
			this.#signal = value;
		} else {
			this.#signal = Rynth.signal(value);
		};

		Object.freeze(this);
	};

	/**
	 * This function only works **once**.
	 * 
	 */
	public map<O>(func: (value: T) => O): Sealed<O> {
		if (this.#locked || this.#locked === undefined) {
			throw new Sealed.LockedError();
		};

		this.#locked = true;
		return new Sealed(this.#signal.map(func));
	};

	public set value(value: T) {
		this.#signal.value = value;
	};
};