import { Component, } from "rynth";
/**
 * A simple *Pico* example.
 * This demo shows just how easy *Glacier* really is!
 *
 * @returns {Component}
 */
export function usePico() {
    return new Component(Symbol('link'), {
        href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.fluid.classless.jade.min.css',
        rel: 'stylesheet',
        children: [],
    });
}
;
