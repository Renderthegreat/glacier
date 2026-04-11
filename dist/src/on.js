import * as Rynth from 'rynth';
export function setup(element, config) {
    element.addEventListener('click', Rynth.unwrap(config['on:click']));
}
;
