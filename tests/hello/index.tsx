import * as Rynth from 'rynth';

import { app, } from '#tests/hello/app';

// Apply plugins here.

console.log(app);

// Replace the current document with the rendered app.
window.document.documentElement.replaceWith(app.render());
// window.document.body.appendChild(app.render());