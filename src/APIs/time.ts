import { IronEnum, } from 'iron-enum';

export class Time {
	public static readonly Data = IronEnum<{
		readonly MUNIX: bigint;
		readonly UNIX: bigint;
		// readonly ISO: `${number}-${number}-${number} ${number}:${number}:${number}`,

		readonly Date: Date;
	}>();

	public static readonly Unit = {
		Second: 1000n,
		Minute: 60n * 1000n,
		Hour: 60n * 60n * 1000n,
		Day: 24n * 60n * 60n * 1000n,
		
		Week: 7n * 24n * 60n * 60n * 1000n,

		// Defined as the actual time it takes for the Earth to complete an entire orbit around the Sun.
		SiderealYear: BigInt(365.25636 * 24 * 60 * 60 * 1000),
		// Defined as the length of a calendar year.
		TropicalYear: BigInt(365.24219 * 24 * 60 * 60 * 1000),
	};

	protected _internal_time: bigint = 0n;

	// TODO: Add `Self` type for more *Rust* like code.
	public constructor(data: typeof Time.Data._.typeOf) {
		data.match({
			MUNIX: (payload: bigint) => {
				this._internal_time = payload;
			},
			UNIX: (payload) => {
				this._internal_time = payload * 1000n;
			},
			/*ISO: (payload: string) => {
				const [year, month, day, hour, minute, second] = /(\d+)-(\d+)-(\d+) (\d):(\d):(\d)/.exec(payload)!.map(Number);

				this._internal_time = BigInt(Date.UTC(year, month - 1, day, hour, minute, second));
			},*/
			Date: (payload: Date) => {
				this._internal_time = BigInt(payload.getTime());
			},
		})
	};
};

const a = new Time(Time.Data.MUNIX(0n));