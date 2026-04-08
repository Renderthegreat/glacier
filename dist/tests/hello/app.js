import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "rynth/jsx-runtime";
import * as Rynth from 'rynth';
import { Body, Head, Header, Button, Break, Show, Meta, } from '#~/elements';
import { createApp, } from '#~/app';
import { usePico, } from '#tests/hello/pico';
/*const mode = Rynth.signal<Theme>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);*/
const counter = Rynth.signal(0);
const elapsed = Rynth.signal(0);
const interval = setInterval(() => {
    elapsed.value++;
}, 1000); // TODO: Rewrite these APIs.
export const app = createApp(_jsxs(_Fragment, { children: [_jsxs(Head, { children: [_jsx(Meta, { name: "title", children: "Hello World!" }), usePico()] }), _jsxs(Body, { children: [_jsx(Header, { children: "My App" }), "Counter is ", counter, ".", _jsx(Break, {}), _jsx(Button, { click: () => {
                        counter.value++;
                    }, children: "Click here to increment the counter" }), _jsx(Break, {}), _jsx(Button, { click: () => {
                        counter.value = 0;
                        elapsed.value = 0;
                    }, children: "Click here to reset the counter" }), _jsx(Break, {}), _jsxs(Show, { when: counter.map((value) => value >= 100), children: ["Good work! Time: ", elapsed, "s."] })] })] }));
