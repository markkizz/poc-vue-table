// type AnyFunction = (...args: any[]) => any;
/* eslint-disable @typescript-eslint/ban-types */

export type AnyFunction = (...param: any[]) => any;

export interface IEmitter {
  on<T extends AnyFunction>(event: string, listener: T): void;
  removeListener(event: string, listener: AnyFunction): void;
  emit(event: string, ...params: any[]): void;
  once<T extends AnyFunction>(
    event: string,
    listener: T,
    ...params: Parameters<T>
  ): void;
}

export default class Emitter {
  events: {
    [key: string]: AnyFunction[];
  } = {};

  on<T extends AnyFunction>(event: string, listener: T) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  removeListener(event: string, listener: AnyFunction) {
    let idx;

    if (typeof this.events[event] === "object") {
      idx = this.events[event].indexOf(listener);

      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }

  emit(event: string, ...params: unknown[]) {
    let i: number;
    let listeners: AnyFunction[];
    let length: number;

    if (typeof this.events[event] === "object") {
      listeners = this.events[event].slice();
      length = listeners.length;
      for (i = 0; i < length; i++) {
        listeners[i].apply(this, params);
      }
    }
  }

  once<T extends AnyFunction>(
    event: string,
    listener: T,
    ...params: Parameters<T>
  ) {
    this.on(event, () => {
      this.removeListener(event, listener);
      listener.apply(this, params);
    });
  }
}
