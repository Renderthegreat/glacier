import { Component, ComponentConfig, hook, } from 'rynth';

import { BodyAttributes, HeadAttributes, Head, Body, } from '#~/elements';
import { Registry, render, } from '#~/render';

export type AppContainerConfig = ComponentConfig<{}>;
export type AppConfig = ComponentConfig<{
	registry: Registry,
	host?: string,
}>;

export type AppErrorConfig = {
	message: string,
	fatal: boolean,
};

export class AppError extends Error {
	public readonly fatal: boolean;

	public constructor(config: AppErrorConfig) {
		super(config.message);

		this.name = 'AppError';
		this.fatal = config.fatal;
	};
};

export class App extends Component<AppConfig> {	
	public constructor(
		public readonly config: AppConfig,
	) {
		if (!(config.children[0] instanceof Component) || !(config.children[1] instanceof Component)) {
			throw new AppError({ message: 'App must have a <head> and <body> element.', fatal: true, });
		};

		if (config.children[0].key.description !== 'head') {
			throw new AppError({ message: 'App must have a <head> element (first child).', fatal: true, });
		};
		if (config.children[1].key.description !== 'body') {
			throw new AppError({ message: 'App must have a <body> element (second child).', fatal: true, });
		};

		super(
			config,
			Symbol(''), // ? Should I make a custom HTML element for this?
		);
	};

	public get head(): Component<HeadAttributes> {
		return this.config.children[0] as Component<HeadAttributes>;
	};

	public get body(): Component<BodyAttributes> {
		return this.config.children[1] as Component<BodyAttributes>	;
	};

	/**
	 * Call this function to render the app.
	 * You don't need to call this function again after the first render.
	 */
	public render(): Node {
		return render({
			root: new Component({ children: this.config.children, }, Symbol('html')),
			registry: this.config.registry,
		});
	};

	/**
	 * Generate a static *HTML* string representation of the app.
	 * You can use this for server-side rendering.
	 * The content can be "thawed" using the `thaw` function.
	 */
	public freeze(): string {
		return (this.render() as Element).outerHTML;
	};

	// public thaw(content: string): Node {
	// 	const node = window.document.createRange().createContextualFragment(content);

	// };
};

export type AppCreationConfig = {
	setup?: (app: App, registry: Registry) => void,
};

/**
 * Creates a new app instance.
 * 
 * @param root - Expects a fragment of [{@link Head}, {@link Body}].
 * @param config - An optional configuration object.
 * @returns {App}
 */
export function createApp(root: Component, config: AppCreationConfig = {}): App {
	const registry: Registry = new WeakMap();


	const app = new App({ children: root.config.children, registry: registry, });

	if (config.setup) {
		config.setup(app, new WeakMap());
	} else {
		hook(app, (component: Component) => {
			// console.log(`Re-rendering... ${component.config}`);

			let oldNode: Node = registry.get(component.key)!;
			let newNode: Node = render({ root: component, registry: registry, });

			// TODO: Ensure every `oldNode` is a `ChildNode`.
			(oldNode as ChildNode).replaceWith(newNode);
		});
	};

	return app;
};