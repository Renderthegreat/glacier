import * as Rynth from 'rynth';
export var Cursor;
(function (Cursor) {
    ;
    function get() {
        let position = Rynth.signal({
            x: Rynth.signal(0),
            y: Rynth.signal(0),
        });
        window.document.addEventListener('mousemove', (event) => {
            position.value = {
                x: Rynth.signal(event.clientX),
                y: Rynth.signal(event.clientY),
            };
        });
        return {
            position: position,
        };
    }
    Cursor.get = get;
    ;
})(Cursor || (Cursor = {}));
;
