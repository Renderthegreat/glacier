import * as Rynth from 'rynth';

import * as G from '#~/components.tsx';

import { primitive, } from '#~/index.ts';

import { App, } from '#~/app.ts';

import { Card, } from '#tests/backtopaper/components/card.tsx';
import { Landing, } from '#tests/backtopaper/components/lander.tsx';


import styleText from '#tests/backtopaper/global.css' with { type: 'text'};

const I = primitive<{}>((v) => v, Symbol('i'));
// TODO: Add router.

export const app: App = App.create(
	<>
		<G.Head>
			<G.Meta name="title">Back to Paper</G.Meta>
			{/*usePico()*/}

			<G.Style>{styleText}</G.Style>
		</G.Head>
		<G.Body>
			<Landing/>
			
			<G.Div>
				
				Companies like <I>Respondus</I> have built a million-dollar industry on a product that cannot exist.
				We're here to expose them.

				
				<Card>
					The virtualization dilimma
				</Card>
			</G.Div>

		</G.Body>
	</>
);