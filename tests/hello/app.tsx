import * as Rynth from 'rynth';

import * as G from '#~/elements';

import { App, createApp, } from '#~/app';

import { render, } from '#~/render';

import { usePico, } from '#tests/hello/utilities/pico';

import { Header, } from '#tests/hello/components/header';

export const app: App = createApp(
	<>
		<G.Head>
			<G.Meta name="title">Hello World!</G.Meta>
			{usePico()}
		</G.Head>
		<G.Body>
			<Header />

			
		</G.Body>
	</>
);
