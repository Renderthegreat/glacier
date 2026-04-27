// # Blocks.
export * from '#~/elements/head';
export * from '#~/elements/body';
export * from '#~/elements/header';
export * from '#~/elements/div';
export * from '#~/elements/text';
export * from '#~/elements/canvas';
export * from '#~/elements/break';
// # Head elements.
export * from '#~/elements/meta';
// # ...
export * from '#~/elements/button';
export * from '#~/elements/input';
// # State based.
export * from '#~/elements/show';
export * from '#~/elements/collection';
// # Custom components
if (globalThis['window'] !== undefined) {
    window.customElements.define('glacier-text', class extends HTMLElement {
        constructor() {
            super();
        }
        ;
    });
}
;
