import * as Rynth from 'rynth';

export type Cursor = {
	position: Rynth.Signal<Cursor.Position>;
};

export namespace Cursor {
	export interface Position {
		x: Rynth.Signal<number>;
		y: Rynth.Signal<number>;
	};

	export function get(): Cursor {
		let position: Rynth.Signal<Cursor.Position> = Rynth.signal({
			x: Rynth.signal(0),
			y: Rynth.signal(0),
		});

		window.document.addEventListener('mousemove', (event) => {
			position.value = {
				x: Rynth.signal(event.clientX),
				y: Rynth.signal(event.clientY),
			};
		});

		return {
			position: position,
		};
	};
};