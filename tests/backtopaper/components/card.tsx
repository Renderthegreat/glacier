import * as Rynth from 'rynth';

import * as G from '#~/components.tsx';
import { componentFunction, } from '#~/index.ts';

export const Card = componentFunction((config) => {
	return <G.Div class='card-container'>
		<G.Div class='card'>
			{config.children}
		</G.Div>
	</G.Div>;
});