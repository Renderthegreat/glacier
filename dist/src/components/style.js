import { primitive, } from '#~/index';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style HTMLStyleElement}.
 */
export const Style = primitive((component) => {
    return component;
}, Symbol('style'));
