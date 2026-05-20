var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../.cache/deno/npm/registry.npmjs.org/eventemitter3/5.0.4/index.js
var require__ = __commonJS({
  "../../../.cache/deno/npm/registry.npmjs.org/eventemitter3/5.0.4/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [
        emitter._events[evt],
        listener
      ];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [
        handlers.fn
      ];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
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
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// ../../../.cache/deno/npm/registry.npmjs.org/eventemitter3/5.0.4/index.mjs
var import_index = __toESM(require__(), 1);

// ../rynth/src/lifecycle.ts
var Lifecycle = class extends import_index.default {
  methods;
  cleanupTasks;
  addCleanupTask(task) {
    this.cleanupTasks.push(task);
  }
  resum\u00E9;
  paused;
  constructor(methods) {
    super(), this.methods = methods, this.cleanupTasks = [], this.resum\u00E9 = [], this.paused = false;
    this.on("pause", () => {
      this.paused = true;
    });
    this.on("resume", () => {
      this.paused = false;
      this.resum\u00E9.forEach(([event, ...args]) => {
        this.methods[event]?.();
        this.emit(event, ...args);
      });
      this.resum\u00E9 = [];
    });
  }
  emit(event, ...args) {
    if (this.paused) {
      this.resum\u00E9.push([
        event,
        ...args
      ]);
    } else {
      this.methods[event]?.();
      super.emit(event, ...args);
    }
    ;
    return true;
  }
  cleanup() {
    this.cleanupTasks.forEach((task) => task());
    this.cleanupTasks = [];
  }
};

// ../rynth/src/component.ts
var Component = class _Component {
  config;
  key;
  lifecycle;
  constructor(config, key = Symbol()) {
    this.config = config;
    this.key = key;
    this.lifecycle = new Lifecycle({});
    this.lifecycle.on("unmount", () => this.dispose());
  }
  /**
  * Disposes of the {@link Component}, and all of its children.
  */
  dispose() {
    this.lifecycle.cleanup();
    for (const child of this.config.children) {
      if (child instanceof _Component) {
        child.lifecycle.emit("unmount");
      }
      ;
    }
    ;
  }
};

// ../rynth/src/signal.ts
var Signal = class _Signal {
  _value;
  listeners = /* @__PURE__ */ new Set();
  constructor(value) {
    this._value = value;
  }
  /**
  * Subscribe to the signal.
  * 
  * @param listener - The listener to be called when the signal value changes.
  * 
  * @returns A function that unsubscribes the listener when called.
  */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this._value);
      } catch (err) {
      }
      ;
    }
    ;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.notify();
  }
  map(func) {
    const signal = new _Signal(func(this.value));
    const unsubscribe = this.subscribe((value) => {
      signal.value = func(value);
    });
    return signal;
  }
  toString() {
    return String(this.value);
  }
  /**
  * Returns the current value of the signal.
  * 
  * This is useful because if the signal is a subclass of {@link Signal<T>}, returns the value of the underlying signal.
  * Otherwise, returns the value itself (as a primitive).
  */
  valueOf() {
    return this.value;
  }
};
function unwrap(value) {
  return value instanceof Signal ? value.value : value;
}

// src/APIs/trigger.ts
(function(On2) {
  function setup(element, config) {
    Object.keys(config).forEach((key) => {
      if (config[key] !== void 0 && key.match(/^on\:/)) {
        element.addEventListener(key.replace("on:", "").toLowerCase(), unwrap(config[key]));
      }
      ;
    });
  }
  On2.setup = setup;
})(On || (On = {}));
var On;

// src/APIs/styles.ts
(function(Style2) {
  class Sheet {
  }
  Style2.Sheet = Sheet;
  function convertToStyleElement(sheet) {
    const cssText = Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n");
    const styleElement = globalThis.document.createElement("style");
    styleElement.textContent = cssText;
    return styleElement;
  }
  function setup(element, sheet) {
    if (sheet === void 0) {
      return;
    }
    ;
    let shadow;
    try {
      shadow = element.attachShadow({
        mode: "open"
      });
    } catch (error) {
      shadow = element.shadowRoot;
      if (!(shadow ?? false)) {
        console.error(`Element cannot host a shadow root or is closed: ${error}.`);
        console.log(element.tagName, element.shadowRoot);
        return;
      }
      ;
    }
    ;
    shadow.appendChild(convertToStyleElement(sheet));
    if (shadow.querySelector("slot") ?? true) {
      const slot = globalThis.document.createElement("slot");
      shadow.appendChild(slot);
    }
    ;
    console.log(element.querySelectorAll(".crumb").entries().toArray().map((node) => node[1].tagName));
  }
  Style2.setup = setup;
})(Style || (Style = {}));
var Style;

// src/index.ts
function setupComponent(component) {
  component.lifecycle.on("mount", ({ node }) => {
    if (node.nodeType == Node.ELEMENT_NODE) {
      const element = node;
      On.setup(element, component.config);
      Style.setup(element, component.config.style);
      return;
    }
    ;
    if (node.childNodes.length == 1) {
    }
    ;
  });
}
function componentFunction(func, base = class {
}) {
  const factory = class extends base {
    of(config) {
      const component = func(config);
      setupComponent(component);
      return component;
    }
  };
  return factory;
}
function primitive(func, key) {
  return class {
    symbol = key;
    of(config) {
      const component = func(new Component(config, key));
      setupComponent(component);
      return component;
    }
  };
}
export {
  componentFunction,
  primitive
};
