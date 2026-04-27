import * as Rynth from 'rynth';
import { On, } from '#~/APIs/trigger';
function setupComponent(component) {
    // Attach the click listener directly to the rendered button element to avoid nested bridge/event-target issues.
    component.lifecycle.on('mount', ({ node, }) => {
        if (node.nodeType == Node.ELEMENT_NODE) {
            const element = node;
            On.setup(element, component.config);
            return;
        }
        ;
        if (node.childNodes.length == 1) {
            // setupComponent(node.childNodes[0]);
        }
        ;
    });
}
;
export function componentFunction(func, base = class {
}) {
    const factory = class extends base {
        of(config) {
            const component = func(config);
            setupComponent(component);
            return component;
        }
        ;
    };
    return factory;
}
;
export function primitive(func, key) {
    return class {
        symbol = key;
        of(config) {
            const component = func(new Rynth.Component(config, key));
            setupComponent(component);
            return component;
        }
        ;
    };
}
;
