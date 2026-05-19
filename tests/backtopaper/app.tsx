import * as Rynth from 'rynth';

import * as G from '#~/components';

import { Style, } from '#~/APIs/styles';


import { App, } from '#~/app';

import { render, } from '#~/render';

import { usePico, } from '#tests/backtopaper/utilities/pico';
import { generateNavigation, } from '#tests/backtopaper/utilities/navigation';

import { Header, } from '#tests/backtopaper/components/header';

export const app: App = App.create(
	<>
		<G.Head>
			<G.Meta name="title">Back to Paper</G.Meta>
			{/*usePico()*/}
		</G.Head>
		<G.Body>
			<Header />

			{generateNavigation([
				{ name: 'Home', path: '/' },
			], 'Home')}
		</G.Body>
	</>
);