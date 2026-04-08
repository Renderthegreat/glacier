import { Component, ComponentConfig, hook, } from 'rynth';

import { BodyAttributes, HeadAttributes, } from '#~/elements';
import { Registry, render, } from '#~/render';

export type AppContainerConfig = ComponentConfig<{}>;
export type AppConfig = ComponentConfig<{
	registry: Registry,
}>;

export class App extends Component<AppConfig> {
	public constructor(
		config: AppConfig,
	) {
		super(
			Symbol(''), // ? Should I make a custom HTML element for this?
			config,
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
		return render({ root: this, registry: this.config.registry });
	};
};

export type AppCreationConfig = {
	setup?: (app: App, registry: Registry) => void,
};

/**
 * Creates a new app instance.
 * 
 * @param root - Expects a fragment of [{<Head/>}, {<Body/>}].
 * @param config - An optional configuration object.
 * @returns {App}
 */
export function createApp(root: Component, config: AppCreationConfig = {}): App {
	const registry: Registry = new Map();


	const app = new App({ children: root.config.children, registry: registry, });

	if (config.setup) {
		config.setup(app, new Map());
	} else {
		hook(app, (component: Component) => {
			// console.log("Re-rendering...");
			let oldNode: Node = registry.get(component.key)!;
			let newNode: Node = render({ root: component, registry: registry, });

			// TODO: Ensure every `oldNode` is a `ChildNode`.
			(oldNode as ChildNode).replaceWith(newNode);
		});
	};

	return app;
};