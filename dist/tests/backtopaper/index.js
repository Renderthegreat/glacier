import { app, } from '#tests/backtopaper/app';
// Apply plugins here.
// Replace the current document with the rendered app.
window.document.documentElement.replaceWith(app.render().documentElement);
// @ts-ignore()
var script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/eruda";
document.head.appendChild(script);
script.onload = function () { eruda.init(); window._.register(); };
