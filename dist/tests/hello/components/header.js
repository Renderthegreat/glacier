import { jsx as _jsx, jsxs as _jsxs } from "rynth/jsx-runtime";
import * as Rynth from 'rynth';
import * as G from '#~/elements';
import { componentFunction, } from '#~/index';
const menuToggle = Rynth.signal(false);
export const Header = componentFunction((config) => {
    return _jsxs(G.Header, { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', }, children: ["My App", _jsxs(G.Div, { children: [_jsx(G.Button, { "on:click": () => { menuToggle.value = !menuToggle.value; }, children: "Menu" }), _jsx(G.Show, { when: menuToggle, children: _jsx(G.Text, { children: "Menu" }) })] })] });
});
