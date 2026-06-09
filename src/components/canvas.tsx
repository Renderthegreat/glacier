import { Component, ComponentFactory, ComponentConfig, } from 'rynth';

import { CommonConfig, } from '#~/common.tsx';

export enum CanvasContextType {
	ImageBitmap = 'imagebitmap',
	Path2D = '2d',
	WebGL = 'webgl',
	WebGL2 = 'webgl2',
};

export type CanvasConfig = { } & CommonConfig;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas HTMLCanvasElement}.
 * This is a very complicated element to implement.
 * I don't think I have what it takes to do it.
 */
export class Canvas implements ComponentFactory<CanvasConfig> {
	public readonly symbol: symbol = Symbol('canvas');

	// TODO: Maybe we should store this inside the component?
	private canvas?: HTMLCanvasElement;

	public of(config: ComponentConfig<CanvasConfig>): Component<CanvasConfig> {
		const component = new Component(config, this.symbol);
		
		component.lifecycle.on('mount', ({ node, }: { node: Node, }) => {
			this.canvas = node as HTMLCanvasElement;
		});

		return component;
	};

	/**
	 * Don't use this unless you are building a better `Canvas` API.
	 * If you somehow do it, please create a pull request.
	 * Good luck! 😉
	 */
	public _getRenderingContext(type: CanvasContextType): RenderingContext | null {
		return this.canvas!.getContext(type);
	};

	
};