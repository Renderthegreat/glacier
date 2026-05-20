import * as Rynth from 'rynth';

import * as G from '#~/components.tsx';

import { App, } from '#~/app.ts';

import { Card, } from '#tests/backtopaper/components/card.tsx';

import styleText from '#tests/backtopaper/global.css' with { type: 'text'};


export const app: App = App.create(
	<>
		<G.Head>
			<G.Meta name="title">Back to Paper</G.Meta>
			{/*usePico()*/}

			<G.Style>{styleText}</G.Style>
		</G.Head>
		<G.Body>
			EdTech is watching...

			<Card>
				0% of lockdown browsers are secure.
			</Card>
		</G.Body>
	</>
);