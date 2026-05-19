import * as Rynth from 'rynth';

import { app, } from '#tests/backtopaper/app';

import styleText from '#tests/backtopaper/global.css' with { type: 'text'};

// Apply plugins here.

// Replace the current document with the rendered app.
window.document.documentElement.replaceWith(app.render().documentElement);

// @ts-ignore()
const script = document.createElement('script');script.src="https://cdn.jsdelivr.net/npm/eruda";document.head.appendChild(script);script.onload=function(){eruda.init();window._.register()};

const style = window.document.createElement('style');



window.document.head.appendChild(
)