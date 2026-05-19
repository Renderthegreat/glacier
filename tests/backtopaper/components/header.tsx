import * as Rynth from 'rynth';

import * as G from '#~/components';
import { componentFunction, } from '#~/index';

const menuToggle = Rynth.signal(false);

export const Header = componentFunction((config) => {
	return <G.Header>
		My App

		<G.Div>
			<G.Button on:click={() => { menuToggle.value = !menuToggle.value; }}>Menu</G.Button>
			<G.Show when={menuToggle}>
				<G.Text>Menu</G.Text>
			</G.Show>
		</G.Div>
	</G.Header>;
});
