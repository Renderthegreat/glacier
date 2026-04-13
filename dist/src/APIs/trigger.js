import * as Rynth from 'rynth';
export var On;
(function (On) {
    function setup(element, config) {
        Object.keys(config).forEach((key) => {
            if (config[key] !== undefined) {
                // `toLowerCase` usage may be trivial.
                element.addEventListener(key.replace('on:', '').toLowerCase(), Rynth.unwrap(config[key]));
            }
            ;
        });
    }
    On.setup = setup;
    ;
    /*export function quickWrapListener<Data>(func: (legacyEvent: Event) => void): (event: Triggered<Data>) => void {
        return (event: Triggered<Data>) => {
            // func();
        };
    };*/
})(On || (On = {}));
;
