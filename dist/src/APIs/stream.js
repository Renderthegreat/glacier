import { IronEnum, } from 'iron-enum';
export class Stream {
    static Status = IronEnum();
    // TODO: Fix this.
    /*public map<Output>(func: (input: Input) => Output): Stream<Output> {
        const _this = this;

        const stream = new class extends Stream<Output> {
            public readonly status = _this.status;
            public readonly data = _this.data.map((inputs) => {
                return func(inputs.at(-1)!);
            });
        };

        return stream;
    };*/
    collect() {
        return new Promise((resolve, reject) => {
            this.status.subscribe((status) => {
                status.match({
                    Closed: () => {
                        resolve(this.data.value);
                    },
                    Error: () => {
                        reject(this.data.value);
                    },
                    _: () => { },
                });
            });
        });
    }
    ;
}
;
