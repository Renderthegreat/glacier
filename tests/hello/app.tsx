import * as Rynth from 'rynth';

import { Body, Head, Header, Div, Button, Input, InputType, Break, Show, Meta, } from '#~/elements';

import { App, createApp, } from '#~/app';

import { render, } from '#~/render';

// import { Style, StyleSheet, FillType, } from '#~/style/index';

import Color from 'colorjs.io';

import { usePico, } from '#tests/hello/pico';


export type Theme = 'light' | 'dark';

/*const mode = Rynth.signal<Theme>(
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);*/

const counter = Rynth.signal(0);
const elapsed = Rynth.signal(0);

const interval = setInterval(() => {
	elapsed.value++;
}, 1000); // TODO: Rewrite these APIs.

export const app: App = createApp(
	<>
		<Head>
			<Meta name="title">Hello World!</Meta>
			{usePico()}
		</Head>
		<Body>
			<Header>
				My App
			</Header>

			Counter is {counter}.
			<Break/>

			<Button
				click={()=>{
					counter.value++;
				}}
			>Click here to increment the counter</Button>
			<Break/>

			<Button
				click={()=>{
					counter.value = 0;
					elapsed.value = 0;
				}}
			>Click here to reset the counter</Button>
			<Break/>

			<Show when={counter.map((value: number) => value >= 100)}>
				Good work! Time: {elapsed}s.
			</Show>
		</Body>
	</>
);