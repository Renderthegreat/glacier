import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "rynth/jsx-runtime";
import * as Rynth from 'rynth';
import { Body, Head, Header, Button, Break, Show, Meta, } from '#~/elements';
import { createApp, } from '#~/app';
// import { Style, StyleSheet, FillType, } from '#~/style/index';
// import Color from 'colorjs.io';
import { usePico, } from '#tests/hello/pico';
let startTime = window.performance.now();
const elapsed = Rynth.signal(0);
const interval = setInterval(() => {
    elapsed.value = window.performance.now() - startTime;
}, 10); // TODO: Rewrite these APIs.
const counter = Rynth.signal(0);
const hasJustWon = counter.map((value) => value == 100);
const hasWon = counter.map((value) => value >= 100);
const bestTime = Rynth.computed([hasJustWon], function (hasJustWon) {
    console.log(this, hasJustWon);
    if (hasJustWon) {
        console.log(elapsed.value, this ?? Infinity);
        return Math.min(elapsed.value, this ?? Infinity);
    }
    ;
    return this ?? Infinity;
});
export const app = createApp(_jsxs(_Fragment, { children: [_jsxs(Head, { children: [_jsx(Meta, { name: "title", children: "Hello World!" }), usePico()] }), _jsxs(Body, { children: [_jsx(Header, { children: "My App" }), "Counter is ", counter, ". Time: ", elapsed.map((value) => (value / 1000).toFixed(3)), "s. Best time: ", bestTime.map((value) => (value / 1000).toFixed(3)), "s.", _jsx(Break, {}), _jsx(Button, { "on:click": () => {
                        counter.value++;
                    }, children: "Click here to increment the counter" }), _jsx(Break, {}), _jsx(Button, { "on:click": () => {
                        counter.value = 0;
                        startTime = window.performance.now();
                    }, children: "Click here to reset the counter" }), _jsx(Break, {}), _jsx(Show, { when: hasWon, children: "Good work!" })] })] }));
