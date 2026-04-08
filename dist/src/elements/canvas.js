import { Component, } from 'rynth';
export var CanvasContextType;
(function (CanvasContextType) {
    CanvasContextType["ImageBitmap"] = "imagebitmap";
    CanvasContextType["Path2D"] = "2d";
    CanvasContextType["WebGL"] = "webgl";
    CanvasContextType["WebGL2"] = "webgl2";
})(CanvasContextType || (CanvasContextType = {}));
;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas HTMLCanvasElement}.
 * This is a very complicated element to implement.
 * I don't think I have what it takes to do it.
 */
export class Canvas {
    symbol = Symbol('canvas');
    // TODO: Maybe we should store this inside the component?
    canvas;
    of(config) {
        const component = new Component(this.symbol, config);
        component.lifecycle.on('mount', ({ node, }) => {
            this.canvas = node;
        });
        return component;
    }
    ;
    /**
     * Don't use this unless you are building a better `Canvas` API.
     * If you somehow do it, please create a pull request.
     * Good luck! 😉
     */
    _getRenderingContext(type) {
        return this.canvas.getContext(type);
    }
    ;
}
;
