import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "rynth/jsx-runtime";
import * as Rynth from 'rynth';
import { Body, Head, Header, Button, Break, Show, Meta, } from '#~/elements';
import { createApp, } from '#~/app';
import { usePico, } from '#tests/hello/pico';
/*const mode = Rynth.signal<Theme>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);*/
const counter = Rynth.signal(0);
let startTime = window.performance.now();
const elapsed = Rynth.signal(0);
const interval = setInterval(() => {
    elapsed.value = window.performance.now() - startTime;
}, 10); // TODO: Rewrite these APIs.
export const app = createApp(_jsxs(_Fragment, { children: [_jsxs(Head, { children: [_jsx(Meta, { name: "title", children: "Hello World!" }), usePico()] }), _jsxs(Body, { children: [_jsx(Header, { children: "My App" }), "Counter is ", counter, ". Time: ", elapsed.map((value) => (value / 1000).toFixed(3)), "s.", _jsx(Break, {}), _jsx(Button, { "on:click": () => {
                        counter.value++;
                    }, children: "Click here to increment the counter" }), _jsx(Break, {}), _jsx(Button, { "on:click": () => {
                        counter.value = 0;
                        startTime = window.performance.now();
                    }, children: "Click here to reset the counter" }), _jsx(Break, {}), _jsx(Show, { when: counter.map((value) => value >= 100), children: "Good work!" })] })] }));
