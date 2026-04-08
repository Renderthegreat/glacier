/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 55
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/**
 * Module dependenices
 */

const clone = __webpack_require__(727);
const typeOf = __webpack_require__(555);
const isPlainObject = __webpack_require__(884);

function cloneDeep(val, instanceClone) {
  switch (typeOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default: {
      return clone(val);
    }
  }
}

function cloneObjectDeep(val, instanceClone) {
  if (typeof instanceClone === 'function') {
    return instanceClone(val);
  }
  if (instanceClone || isPlainObject(val)) {
    const res = new val.constructor();
    for (let key in val) {
      res[key] = cloneDeep(val[key], instanceClone);
    }
    return res;
  }
  return val;
}

function cloneArrayDeep(val, instanceClone) {
  const res = new val.constructor(val.length);
  for (let i = 0; i < val.length; i++) {
    res[i] = cloneDeep(val[i], instanceClone);
  }
  return res;
}

/**
 * Expose `cloneDeep`
 */

module.exports = cloneDeep;


/***/ },

/***/ 792
(module) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ },

/***/ 884
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(82);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ },

/***/ 82
(module) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ },

/***/ 555
(module) {

var toString = Object.prototype.toString;

module.exports = function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  var type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weakmap';
    case 'WeakSet': return 'weakset';
    case 'Map': return 'map';
    case 'Set': return 'set';

    // 8-bit typed arrays
    case 'Int8Array': return 'int8array';
    case 'Uint8Array': return 'uint8array';
    case 'Uint8ClampedArray': return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array': return 'int16array';
    case 'Uint16Array': return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array': return 'int32array';
    case 'Uint32Array': return 'uint32array';
    case 'Float32Array': return 'float32array';
    case 'Float64Array': return 'float64array';
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString.call(val);
  switch (type) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'mapiterator';
    case '[object Set Iterator]': return 'setiterator';
    case '[object String Iterator]': return 'stringiterator';
    case '[object Array Iterator]': return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

function isError(val) {
  return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function'
    && typeof val.getDate === 'function'
    && typeof val.setDate === 'function';
}

function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string'
    && typeof val.ignoreCase === 'boolean'
    && typeof val.multiline === 'boolean'
    && typeof val.global === 'boolean';
}

function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}

function isGeneratorObj(val) {
  return typeof val.throw === 'function'
    && typeof val.return === 'function'
    && typeof val.next === 'function';
}

function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}


/***/ },

/***/ 727
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */



const valueOf = Symbol.prototype.valueOf;
const typeOf = __webpack_require__(555);

function clone(val, deep) {
  switch (typeOf(val)) {
    case 'array':
      return val.slice();
    case 'object':
      return Object.assign({}, val);
    case 'date':
      return new val.constructor(Number(val));
    case 'map':
      return new Map(val);
    case 'set':
      return new Set(val);
    case 'buffer':
      return cloneBuffer(val);
    case 'symbol':
      return cloneSymbol(val);
    case 'arraybuffer':
      return cloneArrayBuffer(val);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(val);
    case 'regexp':
      return cloneRegExp(val);
    case 'error':
      return Object.create(val);
    default: {
      return val;
    }
  }
}

function cloneRegExp(val) {
  const flags = val.flags !== void 0 ? val.flags : (/\w+$/.exec(val) || void 0);
  const re = new val.constructor(val.source, flags);
  re.lastIndex = val.lastIndex;
  return re;
}

function cloneArrayBuffer(val) {
  const res = new val.constructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));
  return res;
}

function cloneTypedArray(val, deep) {
  return new val.constructor(val.buffer, val.byteOffset, val.length);
}

function cloneBuffer(val) {
  const len = val.length;
  const buf = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
  val.copy(buf);
  return buf;
}

function cloneSymbol(val) {
  return valueOf ? Object(valueOf.call(val)) : {};
}

/**
 * Expose `clone`
 */

module.exports = clone;


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ../node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__(792);
;// ../node_modules/eventemitter3/index.mjs
/* unused harmony import specifier */ var EventEmitter;



/* harmony default export */ const node_modules_eventemitter3 = ((/* unused pure expression or super */ null && (EventEmitter)));

;// ../rynth/dist/src/lifecycle.js

class Lifecycle extends eventemitter3 {
    methods;
    cleanupTasks = [];
    addCleanupTask(task) {
        this.cleanupTasks.push(task);
    }
    ;
    cleanup() {
        this.cleanupTasks.forEach(task => task());
        this.cleanupTasks = [];
    }
    ;
    constructor(methods) {
        super();
        this.methods = methods;
    }
    ;
    emit(event, ...args) {
        this.methods[event]?.();
        super.emit(event, ...args);
        return true;
    }
    ;
}
;

;// ../rynth/dist/src/component.js

class Component {
    type;
    config;
    key = Symbol();
    lifecycle = new Lifecycle({});
    constructor(type, config) {
        this.type = type;
        this.config = config;
        // Bind disposal so `this` is preserved and disposal doesn't
        // get called with an incorrect context.
        this.lifecycle.on('unmount', () => this.dispose());
    }
    ;
    /**
     * Disposes of the {@link Component}, and all of its children.
     */
    dispose() {
        this.lifecycle.cleanup();
        // Recursively dispose of children
        for (const child of this.config.children) {
            if (child instanceof Component) {
                // Emit `unmount` on children so their lifecycle handlers
                // run and cleanup is centralized through the lifecycle.
                child.lifecycle.emit('unmount');
            }
            ;
        }
        ;
    }
    ;
}
;
;

;// ../rynth/dist/src/jsx-runtime.js

class FragmentFactory {
    symbol = Symbol('');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
/**
 * Don't use this type, it's only for the JSX compiler.
 * @deprecated
 */
class Fragment extends FragmentFactory {
}
;
function jsx(type, config) {
    const children = (config.children instanceof Array ? config.children : [config.children]);
    return (new type()).of({
        ...config,
        children: children,
    });
}
;
function jsxs(type, config) {
    let children = [];
    for (const child of config.children) {
        if (child instanceof Component) {
            children.push(child);
            continue;
        }
        ;
        children.push(jsx(FragmentFactory, { children: [child], }));
    }
    ;
    return (new type()).of({
        ...config,
        children: children,
    });
}
;
;

;// ../rynth/dist/src/signal.js
class Signal {
    _value;
    listeners = new Array();
    constructor(value) {
        this._value = value;
    }
    ;
    subscribe(listener) {
        // Debug: log subscription creation (temporary)
        // console.debug('Signal.subscribe', listener);
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
    ;
    notify() {
        for (const listener of this.listeners) {
            try {
                listener(this._value);
            }
            catch (err) {
                // TODO: Add error handling system.
            }
            ;
        }
        ;
    }
    ;
    get value() {
        return this._value;
    }
    ;
    set value(value) {
        this._value = value;
        this.notify();
    }
    ;
    map(func) {
        const signal = new Signal(func(this.value));
        const unsubscribe = this.subscribe((value) => {
            signal.value = func(value);
        });
        return signal;
    }
    ;
    toString() {
        return String(this.value);
    }
    ;
    /**
     * Returns the current value of the signal. If the signal is a
     * subclass of {@link Signal<T>}, returns the value of the underlying
     * signal. Otherwise, returns the value itself.
     */
    valueOf() {
        return this.value;
    }
    ;
}
;
function signal(value) {
    return new Signal(value);
}
;

;// ../rynth/dist/src/hook.js


function hook(root, callback) {
    for (const child of root.config.children) {
        if (child instanceof Component) {
            hook(child, callback);
            continue;
        }
        ;
        if (child instanceof Signal) {
            const unsubscribe = child.subscribe(() => {
                callback(root, child);
            });
            root.lifecycle.addCleanupTask(unsubscribe);
            continue;
        }
        ;
    }
    ;
    for (const [key, value] of Object.entries(root.config)) {
        if (key === 'children') {
            continue;
        }
        ;
        if (value instanceof Signal) {
            const unsubscribe = value.subscribe(() => {
                callback(root, value);
            });
            root.lifecycle.addCleanupTask(unsubscribe);
            continue;
        }
        ;
    }
    ;
}
;

;// ../rynth/dist/src/index.js




;// ./dist/src/elements/head.js

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head HTMLHeadElement}.
 */
class Head {
    symbol = Symbol('head');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;

;// ./dist/src/elements/body.js

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body HTMLBodyElement}.
 */
class Body {
    symbol = Symbol('body');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;

;// ./dist/src/elements/header.js

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header HTMLHeaderElement}.
 */
class Header {
    symbol = Symbol('header');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;

;// ./dist/src/elements/div.js
/* unused harmony import specifier */ var div_Component;

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div HTMLDivElement}.
 */
class Div {
    symbol = Symbol('div');
    of(config) {
        return new div_Component(this.symbol, config);
    }
    ;
}
;

;// ./dist/src/elements/canvas.js
/* unused harmony import specifier */ var canvas_Component;

var CanvasContextType;
(function (CanvasContextType) {
    CanvasContextType["ImageBitmap"] = "imagebitmap";
    CanvasContextType["Path2D"] = "2d";
    CanvasContextType["WebGL"] = "webgl";
    CanvasContextType["WebGL2"] = "webgl2";
})(CanvasContextType || (CanvasContextType = {}));
;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas HTMLCanvasElement}.
 * This is a very complicated element to implement.
 * I don't think I have what it takes to do it.
 */
class Canvas {
    symbol = Symbol('canvas');
    // TODO: Maybe we should store this inside the component?
    canvas;
    of(config) {
        const component = new canvas_Component(this.symbol, config);
        component.lifecycle.on('mount', ({ node, }) => {
            this.canvas = node;
        });
        return component;
    }
    ;
    /**
     * Don't use this unless you are building a better `Canvas` API.
     * If you somehow do it, please create a pull request.
     * Good luck! 😉
     */
    _getRenderingContext(type) {
        return this.canvas.getContext(type);
    }
    ;
}
;

;// ./dist/src/elements/break.js

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bR HTMLBRElement}.
 */
class Break {
    symbol = Symbol('br');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;

;// ./dist/src/elements/meta.js

/**
 * Meta data for the page.
 */
class Meta {
    symbol = Symbol('meta');
    of(config) {
        if (config.name == 'title') {
            // I hate how this works.
            return new Component(Symbol('title'), {
                children: config.children,
            });
        }
        ;
        const newConfig = {
            name: config.name,
            value: String(config.children[0]),
            children: [],
        };
        return new Component(this.symbol, newConfig);
    }
    ;
}
;

;// ./dist/src/elements/button.js

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button HTMLButtonElement}.
 */
class Button {
    symbol = Symbol('button');
    of(config) {
        const component = new Component(this.symbol, config);
        // Attach the click listener directly to the rendered button element
        // to avoid nested bridge/event-target issues.
        component.lifecycle.on('mount', ({ node, }) => {
            const buttonElement = node;
            buttonElement.addEventListener('click', () => {
                config.click?.();
            });
        });
        return component;
    }
    ;
}
;

;// ../node_modules/iron-enum/dist/mod.js
/**
 * IronEnum – Zero-dependency Rust-style tagged-union helpers for TypeScript.
 *
 * A small utility to build runtime representations of discriminated unions,
 * with type-safe pattern matching and ergonomic Result/Option types.
 *
 * @example
 * // Define an enum
 * const Status = IronEnum<{
 * 		Loading: undefined;
 * 		Ready: { finishedAt: Date };
 * 		Error: { message: string; code: number };
 * }>();
 *
 * // Create instances
 * const s1 = Status.Loading();
 * const s2 = Status.Ready({ finishedAt: new Date() });
 *
 * // Narrow using .is()
 * if (s2.is("Ready")) {
 * 		s2.data.finishedAt.toISOString();
 * }
 *
 * // Match with fallback
 * const msg = s2.match({
 * 		Loading: () => "Working",
 * 		Ready: ({ finishedAt }) => finishedAt.toISOString(),
 * 		_: () => "Unknown"
 * });
 *
 * // Exhaustive match (no fallback allowed)
 * const iso = s2.matchExhaustive({
 * 		Loading: () => "n/a",
 * 		Ready: ({ finishedAt }) => finishedAt.toISOString(),
 * 		Error: () => "n/a",
 * });
 *
 * @example
 * // Result and Option usage
 * const R = Result<number, string>();
 * const r1 = R.Ok(42);
 * const r2 = R.Err("nope");
 * const val = r1.unwrap_or(0); // 42
 *
 * const O = Option<number>();
 * const some = O.Some(7);
 * const none = O.None();
 * const out = some.map(x => x * 2).unwrap(); // 14
 */
/* =============================================================================
 * Factory Implementation
 * ============================================================================= */
/**
 * Create a concrete variant instance and attach all methods.
 *
 * This function centralizes the instance layout and avoids per-call
 * function allocation differences across factories.
 */
function enumFactory(_allVariants, tag, data, instance) {
    if (tag === "_")
        throw new Error("'_' is reserved as a fallback key.");
    // Self reference enables methods to pass a stable instance shape.
    const self = {};
    const is = (key) => key === tag;
    const _if = (key, success, failure) => {
        const hit = key === tag;
        if (hit) {
            if (success) {
                const r = success(data, self);
                return (r === undefined ? true : r);
            }
            return true;
        }
        if (failure) {
            const r = failure(self);
            return (r === undefined ? false : r);
        }
        return false;
    };
    const _ifNot = (key, success, failure) => {
        const miss = key !== tag;
        if (miss) {
            if (success) {
                const r = success(self);
                return (r === undefined ? true : r);
            }
            return true;
        }
        if (failure) {
            const r = failure(data, self);
            return (r === undefined ? false : r);
        }
        return false;
    };
    const match = (callbacks) => {
        const specific = callbacks[tag];
        const cb = specific ?? callbacks._;
        if (!cb) {
            throw new Error(`No handler for '${String(tag)}' and no '_' fallback`);
        }
        return specific ? cb(data, self) : cb(self);
    };
    const matchAsync = async (callbacks) => {
        const specific = callbacks[tag];
        const cb = specific ?? callbacks._;
        if (!cb) {
            throw new Error(`No handler for '${String(tag)}' and no '_' fallback`);
        }
        return specific ? cb(data, self) : cb(self);
    };
    const matchExhaustive = (callbacks) => {
        const cb = callbacks[tag];
        return cb(data, self);
    };
    const selfProperties = {
        tag,
        data,
        instance,
        toJSON: () => ({ tag, data }),
        is: is,
        if: _if,
        ifNot: _ifNot,
        match: match,
        matchAsync: matchAsync,
        matchExhaustive: matchExhaustive,
    };
    Object.assign(self, selfProperties);
    return self;
}
/**
 * Create a new enum factory.
 *
 * @param args - Optional arguments.
 * @param args.keys - An array of variant keys. Providing this skips the
 * Proxy-based implementation for a faster, pre-bound factory.
 *
 * @example
 * // Dynamic (Proxy-based, slower)
 * const Status = IronEnum<{
 * 		A: undefined;
 * 		B: undefined;
 * }>();
 *
 * // Pre-bound (Fast, no Proxy)
 * const FastStatus = IronEnum<{
 * 		A: undefined;
 * 		B: undefined;
 * }>({ keys: ["A", "B"] });
 */
function IronEnum(args) {
    const keys = args?.keys;
    let result = {};
    const parse = (dataObj) => {
        const actualKey = dataObj.tag;
        if (keys?.length && !keys.includes(actualKey)) {
            throw new Error(`Unexpected variant '${actualKey}'`);
        }
        return enumFactory({}, actualKey, dataObj.data, result);
    };
    const _ = {
        typeTags: undefined, // [TYPE ONLY]
        typeData: undefined, // [TYPE ONLY]
        typeOf: undefined, // [TYPE ONLY]
        typeJson: undefined, // [TYPE ONLY]
        parse,
        fromJSON: parse,
        reviver(obj) {
            if (obj && typeof obj === "object" && "tag" in obj && "data" in obj) {
                // We use parse, but must cast the input.
                // The `in` checks are a reasonable safeguard.
                return parse(obj);
            }
            return obj;
        },
    };
    // Keyed fast-path (no Proxy)
    if (keys?.length) {
        result = { _ };
        for (const key of keys) {
            result[key] = ((...args) => enumFactory({}, key, args[0], result));
        }
        return result;
    }
    // Dynamic Proxy builder with built-in guard
    const BUILTINS = new Set(["toString", "valueOf", "inspect", "constructor"]);
    result = new Proxy({}, {
        get: (_tgt, prop) => {
            if (prop === "_")
                return _;
            if (typeof prop !== "string")
                return undefined;
            if (BUILTINS.has(prop)) {
                const fn = Object.prototype[prop];
                return typeof fn === "function" ? fn.bind(result) : undefined;
            }
            return (...args) => {
                const data = args[0];
                return enumFactory({}, prop, data, result);
            };
        },
    });
    return result;
}
/**
 * Internal constructor for a typed Result factory.
 *
 * A fresh factory is produced per `<T,E>` instantiation to preserve
 * factory identity and allow future per-type runtime extensibility.
 */
const ResultInternal = () => {
    const R = IronEnum({ keys: ["Err", "Ok"] });
    const OkCtor = (value) => {
        const base = R.Ok(value);
        return Object.assign(base, {
            unwrap: () => value,
            unwrap_or: () => value,
            unwrap_or_else: () => value,
            isOk: () => true,
            isErr: () => false,
            ok: () => Option().Some(value),
            map(f) {
                return Result().Ok(f(value));
            },
            mapErr(_f) {
                return Result().Ok(value);
            },
            andThen(f) {
                return f(value);
            },
        });
    };
    const ErrCtor = (error) => {
        const base = R.Err(error);
        return Object.assign(base, {
            unwrap: () => {
                throw error instanceof Error ? error : new Error(String(error ?? "Err"));
            },
            unwrap_or: (x) => x,
            unwrap_or_else: (cb) => cb(),
            isOk: () => false,
            isErr: () => true,
            ok: () => Option().None(),
            map(_f) {
                return Result().Err(error);
            },
            mapErr(f) {
                return Result().Err(f(error));
            },
            andThen(_f) {
                return Result().Err(error);
            },
        });
    };
    return { _: R._, Ok: OkCtor, Err: ErrCtor };
};
/**
 * Create a typed Result factory `<T,E>`.
 *
 * @example
 * const StringResult = Result<string, Error>();
 * const r1 = StringResult.Ok("hello");
 *
 * function process(r: typeof StringResult._.typeOf) {
 * // ...
 * }
 */
const Result = () => ResultInternal();
/**
 * Convenience Ok constructor for ad-hoc success values.
 * The `Err` type is `never`.
 *
 * @example
 * const r = Ok(123); // ResultVariant<{ Ok: number, Err: never }>
 */
const Ok = (value) => Result().Ok(value);
/**
 * Convenience Err constructor for ad-hoc error values.
 * The `Ok` type is `never`.
 *
 * @example
 * const r = Err("oops"); // ResultVariant<{ Ok: never, Err: string }>
 */
const Err = (error) => Result().Err(error);
/**
 * Internal constructor for a typed Option factory.
 */
const OptionInternal = () => {
    const O = IronEnum({ keys: ["None", "Some"] });
    const SomeCtor = (value) => {
        const base = O.Some(value);
        return Object.assign(base, {
            isSome: () => true,
            isNone: () => false,
            unwrap: () => value,
            unwrap_or: () => value,
            unwrap_or_else: () => value,
            ok_or(_err) {
                return Result().Ok(value);
            },
            ok_or_else(_errFn) {
                return Result().Ok(value);
            },
            map(f) {
                return Option().Some(f(value));
            },
            andThen(f) {
                return f(value);
            },
            filter(p) {
                return p(value) ? Option().Some(value) : Option().None();
            },
        });
    };
    const NoneCtor = () => {
        const base = O.None();
        return Object.assign(base, {
            isSome: () => false,
            isNone: () => true,
            unwrap: () => {
                throw new Error("Called unwrap() on Option.None");
            },
            unwrap_or: (x) => x,
            unwrap_or_else: (cb) => cb(),
            ok_or(err) {
                return Result().Err(err);
            },
            ok_or_else(errFn) {
                return Result().Err(errFn());
            },
            map(_f) {
                return Option().None();
            },
            andThen(_f) {
                return Option().None();
            },
            filter(_p) {
                return Option().None();
            },
        });
    };
    return { _: O._, Some: SomeCtor, None: NoneCtor };
};
/**
 * Create a typed Option factory `<T>`.
 *
 * @example
 * const NumberOption = Option<number>();
 * const s = NumberOption.Some(100);
 *
 * function process(o: typeof NumberOption._.typeOf) {
 * // ...
 * }
 */
const Option = () => OptionInternal();
/**
 * Convenience Some constructor for ad-hoc values.
 *
 * @example
 * const s = Some(123); // OptionVariant<{ Some: number, ... }>
 */
const Some = (value) => Option().Some(value);
/**
 * Convenience None constructor.
 * The `Some` type is `never`.
 *
 * @example
 * const n = None(); // OptionVariant<{ Some: never, ... }>
 */
const None = () => Option().None();
/* =============================================================================
 * Try / TryInto Utilities
 * ============================================================================= */
/**
 * Convert exception-throwing code into Result-returning code.
 */
const Try = {
    /**
     * Execute a synchronous function and wrap the outcome.
     *
     * Ok on success, Err with the caught exception on failure.
     *
     * @example
     * const throws = () => { throw new Error("!"); };
     * const r = Try.sync(throws); // Err(Error("!"))
     *
     * const r2 = Try.sync(() => JSON.parse("{")); // Err(SyntaxError(...))
     * const r3 = Try.sync(() => JSON.parse('{"a":1}')); // Ok({ a: 1 })
     */
    sync(cb) {
        // Create a single factory for this function's return type
        const R = Result();
        try {
            // Use the local factory's .Ok
            return R.Ok(cb());
        }
        catch (e) {
            // Use the local factory's .Err
            return R.Err(e);
        }
    },
    /**
     * Execute an asynchronous function and wrap the outcome.
     *
     * Resolves to Ok on success, Err with the caught exception on rejection.
     *
     * @example
     * const rejects = async () => { throw new Error("!"); };
     * const r = await Try.async(rejects); // Err(Error("!"))
     *
     * const r2 = await Try.async(() => fetch("/good")); // Ok(Response)
     */
    async async(cb) {
        // Create a single factory for this function's return type
        const R = Result();
        try {
            // Use the local factory's .Ok
            return R.Ok(await cb());
        }
        catch (e) {
            // Use the local factory's .Err
            return R.Err(e);
        }
    },
};
/**
 * Transform functions to return Result instead of throwing.
 */
const TryInto = {
    /**
     * Wrap a synchronous function. The wrapper never throws.
     *
     * @example
     * const unsafeParse = (s: string) => JSON.parse(s);
     * const safeParse = TryInto.sync(unsafeParse);
     *
     * const r1 = safeParse('{"a":1}'); // Ok({ a: 1 })
     * const r2 = safeParse("{"); // Err(SyntaxError(...))
     */
    sync(cb) {
        return (...args) => Try.sync(() => cb(...args));
    },
    /**
     * Wrap an asynchronous function. The wrapper resolves to Result
     * instead of rejecting.
     *
     * @example
     * const unsafeFetch = async (url: string) => {
     * 		const res = await fetch(url);
     * 		if (!res.ok) throw new Error(res.statusText);
     * 		return res.json();
     * }
     *
     * const safeFetch = TryInto.async(unsafeFetch);
     *
     * const r1 = await safeFetch("/api/data"); // Ok(data)
     * const r2 = await safeFetch("/api/404"); // Err(Error("Not Found"))
     */
    async(cb) {
        return async (...args) => Try.async(() => cb(...args));
    },
};
//# sourceMappingURL=mod.js.map
;// ./dist/src/elements/input.js
/* unused harmony import specifier */ var input_Component;


const InputData = IronEnum();
const InputType = IronEnum();
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input HTMLInputElement}.
 * TODO: Add all input types. Also, make it possible to add new input types!
 */
class Input {
    symbol = Symbol('input');
    of(config) {
        let newConfig = {
            children: config.children,
        };
        config.type.match({
            Text: () => {
                newConfig.type = InputType.Text();
            },
            Password: () => {
                newConfig.type = InputType.Password();
            },
            Email: () => {
                newConfig.type = InputType.Email();
            },
            Number: () => {
                newConfig.type = InputType.Number();
            },
            CheckBox: () => {
                newConfig.type = InputType.CheckBox();
            },
            Radio: () => {
                newConfig.type = InputType.Radio();
            },
            File: () => {
                newConfig.type = InputType.File();
            },
            Hidden: () => {
                newConfig.type = InputType.Hidden();
            },
            Search: () => {
                newConfig.type = InputType.Search();
            },
            Telephone: () => {
                newConfig.type = InputType.Telephone();
            },
            URL: () => {
                newConfig.type = InputType.URL();
            },
            Time: () => {
                newConfig.type = InputType.Time();
            },
            Color: () => {
                newConfig.type = InputType.Color();
            },
        });
        return new input_Component(this.symbol, newConfig);
    }
    ;
}
;

// EXTERNAL MODULE: ../node_modules/clone-deep/index.js
var clone_deep = __webpack_require__(55);
;// ./dist/src/elements/show.js


class Show {
    symbol = Symbol('');
    of(config) {
        const whenSignal = config.when;
        const componentSignal = new Signal(null);
        // Ensure we don't destroy the real `config` on unmount.
        const getNewConfig = () => {
            return clone_deep(config);
        };
        const wrapper = new Component(this.symbol, {
            ...config,
            children: [
                componentSignal
            ],
        });
        // Subscribe to `whenSignal` and update the inner component.
        const unsubscribe = whenSignal.subscribe((value) => {
            console.log(`Show: ${value}.`);
            if (value) {
                componentSignal.value = new Component(this.symbol, getNewConfig());
            }
            else {
                componentSignal.value?.lifecycle.emit('unmount');
                componentSignal.value = null;
            }
            ;
        });
        wrapper.lifecycle.addCleanupTask(unsubscribe);
        // Initialize based on current value.
        if (whenSignal.value) {
            componentSignal.value = new Component(this.symbol, getNewConfig());
        }
        ;
        return wrapper;
    }
    ;
}
;

;// ./dist/src/elements.js
// # Blocks.






// # Head elements.

// # ...


// # Conditionals.


;// ./dist/src/render.js

/**
 * Resolves a single child ({@link Component}, {@link Signal}, or primitive) into a physical DOM Node.
 */
function resolveChild({ child, registry, root, }) {
    if (child instanceof Component) {
        return render({ root: child, registry });
    }
    ;
    if (child instanceof Signal) {
        // We always return a stable Node (either the initial rendered node
        // or a placeholder) so that future updates can replace it in-place.
        const placeholder = window.document.createComment('signal');
        let currentNode = null;
        let lastValue = child.value;
        const mountForValue = (value) => {
            if (value instanceof Component) {
                return render({ root: value, registry });
            }
            ;
            if (value === null) {
                return null;
            }
            ;
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                return window.document.createTextNode(String(value));
            }
            ;
            return null;
        };
        // Initialize current node (or use placeholder if nothing to render yet).
        currentNode = mountForValue(lastValue);
        const nodeToReturn = currentNode ?? placeholder;
        // Subscribe to future updates and swap nodes in the DOM as needed.
        const unsubscribe = child.subscribe((value) => {
            if (value === lastValue)
                return;
            const previous = lastValue;
            lastValue = value;
            // If the previous value was a Component, emit unmount so it can cleanup.
            if (previous instanceof Component) {
                previous.lifecycle.emit('unmount');
                registry.delete(previous.key);
            }
            ;
            const newNode = mountForValue(value);
            if (newNode) {
                // Insert or replace in DOM.
                if (currentNode) {
                    currentNode.replaceWith(newNode);
                }
                else {
                    placeholder.replaceWith(newNode);
                }
                ;
                currentNode = newNode;
            }
            else {
                // New value is null — remove current node and restore placeholder.
                if (currentNode) {
                    currentNode.replaceWith(placeholder);
                    currentNode = null;
                }
                ;
            }
            ;
        });
        root.lifecycle.addCleanupTask(unsubscribe);
        return nodeToReturn;
    }
    ;
    if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
        return window.document.createTextNode(String(child));
    }
    ;
    return null;
}
;
/**
 * Renders a given component tree into a DOM node.
 */
function render({ root, registry, }) {
    const isFragment = root.type.description === '';
    // # Handle Fragments.
    if (isFragment) {
        if (root.config.children.length === 0) {
            const empty = window.document.createTextNode('');
            registry.set(root.key, empty);
            return empty;
        }
        ;
        const fragment = window.document.createDocumentFragment();
        let firstNode = null;
        for (const child of root.config.children) {
            const childNode = resolveChild({ child, registry, root, });
            if (childNode) {
                fragment.appendChild(childNode);
                if (!firstNode) {
                    firstNode = childNode;
                }
                ; // Track the first one for the registry.
            }
            ;
        }
        ;
        if (firstNode) {
            registry.set(root.key, firstNode);
        }
        ;
        // HACK(+): If there's only 1 child, just return it directly to avoid the Fragment wrapper.
        // TODO: Check if this causes any issues.
        return root.config.children.length === 1 && firstNode ? firstNode : fragment;
    }
    ;
    // # Handle Standard Elements.
    const node = window.document.createElement(root.type.description);
    registry.set(root.key, node);
    // Apply attributes gracefully.
    for (const [key, value] of Object.entries(root.config)) {
        if (key === 'children') {
            continue;
        }
        ;
        // Support reactive attribute values via `Signal`.
        if (value instanceof Signal) {
            const v = value.value;
            if (v == null) {
                node.removeAttribute(key);
            }
            else {
                node.setAttribute(key, String(v));
            }
            ;
            const unsubscribeAttr = value.subscribe((nv) => {
                if (nv == null) {
                    node.removeAttribute(key);
                }
                else {
                    node.setAttribute(key, String(nv));
                }
                ;
            });
            root.lifecycle.addCleanupTask(unsubscribeAttr);
            continue;
        }
        ;
        if (value == null) {
            node.removeAttribute(key);
        }
        else {
            node.setAttribute(key, String(value));
        }
        ;
    }
    ;
    // Append all children using our modular helper.
    for (const child of root.config.children) {
        const childNode = resolveChild({ child, registry, root, });
        if (childNode) {
            node.appendChild(childNode);
        }
        ;
    }
    ;
    // Fire lifecycle hook.
    root.lifecycle.emit('mount', { node, });
    return node;
}
;

;// ./dist/src/app.js


class App extends Component {
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
function createApp(root, config = {}) {
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

;// ./dist/tests/hello/pico.js

/**
 * A simple *Pico* example.
 * This demo shows just how easy *Glacier* really is!
 *
 * @returns {Component}
 */
function usePico() {
    return new Component(Symbol('link'), {
        href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.fluid.classless.jade.min.css',
        rel: 'stylesheet',
        children: [],
    });
}
;

;// ./dist/tests/hello/app.js





/*const mode = Rynth.signal<Theme>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);*/
const counter = signal(0);
const elapsed = signal(0);
const interval = setInterval(() => {
    elapsed.value++;
}, 1000); // TODO: Rewrite these APIs.
const app = createApp(jsxs(Fragment, { children: [jsxs(Head, { children: [jsx(Meta, { name: "title", children: "Hello World!" }), usePico()] }), jsxs(Body, { children: [jsx(Header, { children: "My App" }), "Counter is ", counter, ".", jsx(Break, {}), jsx(Button, { click: () => {
                        counter.value++;
                    }, children: "Click here to increment the counter" }), jsx(Break, {}), jsx(Button, { click: () => {
                        counter.value = 0;
                        elapsed.value = 0;
                    }, children: "Click here to reset the counter" }), jsx(Break, {}), jsxs(Show, { when: counter.map((value) => value >= 100), children: ["Good work! Time: ", elapsed, "s."] })] })] }));

;// ./dist/tests/hello/index.js

window.document.body.appendChild(app.render());

})();

/******/ })()
;
//# sourceMappingURL=hello.bundle.js.map