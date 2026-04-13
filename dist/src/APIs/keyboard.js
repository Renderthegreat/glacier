import * as Rynth from 'rynth';
import { IronEnum, } from 'iron-enum';
export const KeyBoardModifiers = IronEnum();
export var Keyboard;
(function (Keyboard) {
    function get() {
        // As of early 2026, there does exist a *Chrome* API for getting the layout of the keyboard: `window.navigator.keyboard`, but it is not available in other browsers yet.
        // Instead, to mock this behaviour we create a keyboard that collects the keys as they are pressed.
        const keys = new Map();
        const keysProxy = new Proxy(keys, {
            get: (target, key) => {
                if (target.has(key)) {
                    return target.get(key);
                }
                else {
                    // TODO:
                }
                ;
            },
        });
        // TODO: Determine if we should use the new *Glacier* APIs for this. 
        window.document.addEventListener('keydown', (event) => {
            if (keys.has(event.key)) {
                keys.get(event.key).down.value = true;
            }
            else {
                keys.set(event.key, {
                    down: Rynth.signal(true),
                });
            }
            ;
        });
        window.document.addEventListener('keyup', (event) => {
            if (keys.has(event.key)) {
                keys.get(event.key).down.value = false;
            }
            ;
        });
    }
    Keyboard.get = get;
    ;
})(Keyboard || (Keyboard = {}));
;
