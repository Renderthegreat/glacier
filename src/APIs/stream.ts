import { Signal, } from 'rynth';

import { IronEnum, } from 'iron-enum';
import { Input } from '#~/elements';

export abstract class Stream<Input> {
	public static readonly Status = IronEnum<{
		readonly Pending: undefined,
		readonly Open: undefined,
		readonly Closed: undefined,
		readonly Error: undefined,
	}>();

	public abstract get status(): Signal<typeof Stream.Status._.typeOf>;

	public abstract get data(): Signal<Input[]>;

	// TODO: Fix this.
	/*public map<Output>(func: (input: Input) => Output): Stream<Output> {
		const _this = this;

		const stream = new class extends Stream<Output> {
			public readonly status = _this.status;
			public readonly data = _this.data.map((inputs) => {
				return func(inputs.at(-1)!);
			});
		};

		return stream;
	};*/

	public collect(): Promise<Input[]> {
		return new Promise((resolve, reject) => {
			this.status.subscribe((status) => {
				status.match({
					Closed: () => {
						resolve(this.data.value);
					},
					Error: () => {
						reject(this.data.value);
					},
					_: () => {},
				});
			})
		});
	};
};