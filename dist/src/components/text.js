import { Component, } from 'rynth';
import { componentFunction, } from '#~/index';
export const Text = componentFunction((config) => {
    const signal = config['bind:value'] || config.children.join();
    const component = new Component({
        ...config,
        children: [signal],
    }, Symbol('glacer-text'));
    return component;
});
