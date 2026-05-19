import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "rynth/jsx-runtime";
import * as G from '#~/components';
import { App, } from '#~/app';
import { generateNavigation, } from '#tests/backtopaper/utilities/navigation';
import { Header, } from '#tests/backtopaper/components/header';
export const app = App.create(_jsxs(_Fragment, { children: [_jsx(G.Head, { children: _jsx(G.Meta, { name: "title", children: "Back to Paper" }) }), _jsxs(G.Body, { children: [_jsx(Header, {}), generateNavigation([
                    { name: 'Home', path: '/' },
                ], 'Home')] })] }));
