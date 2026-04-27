import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "rynth/jsx-runtime";
import * as G from '#~/elements';
import { createApp, } from '#~/app';
// import { Style, StyleSheet, FillType, } from '#~/style/index';
// import Color from 'colorjs.io';
import { usePico, } from '#tests/hello/utilities/pico';
import { Header, } from '#tests/hello/components/header';
export const app = createApp(_jsxs(_Fragment, { children: [_jsxs(G.Head, { children: [_jsx(G.Meta, { name: "title", children: "Hello World!" }), usePico()] }), _jsx(G.Body, { children: _jsx(Header, {}) })] }));
