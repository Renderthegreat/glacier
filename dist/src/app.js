import { Component, hook, } from 'rynth';
import { render, } from '#~/render';
export class AppError extends Error {
    fatal;
    constructor(config) {
        super(config.message);
        this.name = 'AppError';
        this.fatal = config.fatal;
    }
    ;
}
;
export class App extends Component {
    config;
    constructor(config) {
        if (!(config.children[0] instanceof Component) || !(config.children[1] instanceof Component)) {
            throw new AppError({ message: 'App must have a <head> and <body> element.', fatal: true, });
        }
        ;
        if (config.children[0].key.description !== 'head') {
            throw new AppError({ message: 'App must have a <head> element (first child).', fatal: true, });
        }
        ;
        if (config.children[1].key.description !== 'body') {
            throw new AppError({ message: 'App must have a <body> element (second child).', fatal: true, });
        }
        ;
        super(config, Symbol(''));
        this.config = config;
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
        return render({
            root: new Component({ children: this.config.children, }, Symbol('html')),
            registry: this.config.registry,
        });
    }
    ;
    /**
     * Generate a static *HTML* string representation of the app.
     * You can use this for server-side rendering.
     * The content can be "thawed" using the `thaw` function.
     */
    freeze() {
        return this.render().outerHTML;
    }
    ;
}
;
/**
 * Creates a new app instance.
 *
 * @param root - Expects a fragment of [{@link Head}, {@link Body}].
 * @param config - An optional configuration object.
 * @returns {App}
 */
export function createApp(root, config = {}) {
    const registry = new WeakMap();
    const app = new App({ children: root.config.children, registry: registry, });
    if (config.setup) {
        config.setup(app, new WeakMap());
    }
    else {
        hook(app, (component) => {
            // console.log(`Re-rendering... ${component.config}`);
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
