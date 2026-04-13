import * as Rynth from 'rynth';

import { Body, Head, Header, Div, Button, Input, InputType, Break, Show, Meta, } from '#~/elements';

import { App, createApp, } from '#~/app';

import { render, } from '#~/render';

// import { Style, StyleSheet, FillType, } from '#~/style/index';

// import Color from 'colorjs.io';

import { usePico, } from '#tests/hello/pico';

let startTime = window.performance.now();

const elapsed = Rynth.signal(0);

const interval = setInterval(() => {
	elapsed.value = window.performance.now() - startTime;
}, 10); // TODO: Rewrite these APIs.

const counter = Rynth.signal(0);

const hasJustWon = counter.map((value: number) => value == 100);
const hasWon = counter.map((value: number) => value >= 100);

const bestTime = Rynth.computed([hasJustWon],
	function (hasJustWon: boolean): number {
		if (hasJustWon) {
			return Math.min(elapsed.value, this ?? Infinity);
		};

		return this ?? Infinity;
	}
);

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
			Time: {elapsed.map((value: number) => (value / 1000).toFixed(3))}s.
			Best time: {bestTime.map((value: number) => (value / 1000).toFixed(3))}s.
			<Break/>

			<Button
				on:click={()=>{
					counter.value++;
				}}
			>Click here to increment the counter</Button>
			<Break/>

			<Button
				on:click={()=>{
					counter.value = 0;
					startTime = window.performance.now();
				}}
			>Click here to reset the counter</Button>
			<Break/>

			<Show when={hasWon}>
				Good work!
			</Show>
		</Body>
	</>
);