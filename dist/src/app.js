import { Component, hook, } from 'rynth';
import { render, } from '#~/render';
export class App extends Component {
    constructor(config) {
        super(Symbol(''), // ? Should I make a custom HTML element for this?
        config);
    }
    ;
    get head() {
        return this.config.children[0];
    }
    ;
    get body() {
        return this.config.children[1];
    }
    ;
    /**
     * Call this function to render the app.
     * You don't need to call this function again after the first render.
     */
    render() {
        return render({ root: this, registry: this.config.registry });
    }
    ;
}
;
/**
 * Creates a new app instance.
 *
 * @param root - Expects a fragment of [{<Head/>}, {<Body/>}].
 * @param config - An optional configuration object.
 * @returns {App}
 */
export function createApp(root, config = {}) {
    const registry = new Map();
    const app = new App({ children: root.config.children, registry: registry, });
    if (config.setup) {
        config.setup(app, new Map());
    }
    else {
        hook(app, (component) => {
            // console.log("Re-rendering...");
            let oldNode = registry.get(component.key);
            let newNode = render({ root: component, registry: registry, });
            // TODO: Ensure every `oldNode` is a `ChildNode`.
            oldNode.replaceWith(newNode);
        });
    }
    ;
    return app;
}
;
