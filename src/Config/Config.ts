/* eslint-disable no-restricted-globals */
import {
  NONE, ALWAYS, CLICK,
  VERTICAL, HORIZONTAL, RANGE, POINT,
} from '../consts';

import INITIALS from './initials';

class Config implements ConfigType {
  #type: typeof RANGE | typeof POINT;

  #orient: typeof HORIZONTAL | typeof VERTICAL;

  #cloud: typeof NONE | typeof ALWAYS | typeof CLICK;

  #rangeOffset: number;

  #beginning:number;

  #step: number;

  #scale: boolean;

  #scaleInterval: number;

  #list: Array<number|string>;

  #value: Array<string>;

  #start: number;

  #end: number;

  public constructor(initialData: UserConfigType) {
    this.list = initialData.list;

    this.rangeOffset = initialData.rangeOffset;
    this.step = initialData.step;
    this.beginning = initialData.beginning;
    this.scaleInterval = initialData.scaleInterval;

    this.type = initialData.type;
    this.orient = initialData.orient;
    this.cloud = initialData.cloud;

    this.scale = initialData.scale;

    this.start = initialData.start;
    this.end = initialData.end;
  }

  get type() {
    return this.#type;
  }

  set type(type: typeof RANGE | typeof POINT) {
    this.#type = (type === RANGE || type === POINT)
      ? type
      : (this.#type || INITIALS.type);
  }

  get orient() {
    return this.#orient;
  }

  set orient(orient: typeof VERTICAL | typeof HORIZONTAL) {
    this.#orient = (orient === VERTICAL || orient === HORIZONTAL)
      ? orient
      : (this.#orient || INITIALS.orient);
  }

  get cloud() {
    return this.#cloud;
  }

  set cloud(display: typeof NONE | typeof ALWAYS | typeof CLICK) {
    this.#cloud = (display === NONE || display === ALWAYS || display === CLICK)
      ? display
      : (this.#cloud || INITIALS.cloud);
  }

  get list() {
    return this.#list;
  }

  set list(list: Array<number|string>) {
    if (list && list.length) {
      this.#list = list;
      this.rangeOffset = list.length;
      this.beginning = 0;
      this.step = 1;
      this.scaleInterval = 1;
    } else {
      this.#list = (this.#list && this.#list.length)
        ? this.#list
        : INITIALS.list;
    }
  }

  get scale() {
    return this.#scale;
  }

  set scale(display: boolean) {
    this.#scale = Boolean(display);
  }

  get beginning() {
    return this.#beginning;
  }

  set beginning(beginning: number) {
    if (this.list.length) this.#beginning = 0;
    else {
      this.#beginning = isNaN(beginning)
        ? (this.#beginning || INITIALS.beginning)
        : Math.round(+beginning);
    }
  }

  get scaleInterval() {
    return this.#scaleInterval;
  }

  set scaleInterval(interval: number) {
    if (this.list.length) this.#scaleInterval = 1;
    else {
      this.#scaleInterval = isNaN(interval)
        ? (this.#scaleInterval || INITIALS.scaleInterval)
        : Math.min(this.#rangeOffset, Math.max(1, Math.round(+interval)));
    }
  }

  get rangeOffset() {
    return this.#rangeOffset;
  }

  set rangeOffset(range: number) {
    if (this.list.length) this.#rangeOffset = this.list.length - 1;
    else {
      this.#rangeOffset = isNaN(range)
        ? (this.#rangeOffset || INITIALS.rangeOffset)
        : Math.max(1, Math.round(+range));
    }
    this.scaleInterval = this.#scaleInterval;
    this.step = this.#step;
  }

  get step() {
    return this.#step;
  }

  set step(step: number) {
    if (this.list.length) this.#step = 1;
    else {
      this.#step = isNaN(step)
        ? (this.#step || INITIALS.step)
        : Math.min(this.#rangeOffset, Math.max(1, Math.round(+step)));
    }
  }

  get value() {
    return this.#value;
  }

  set value(value: Array<string>) {
    this.#value = value;
  }

  get start() {
    return this.#start;
  }

  set start(value: number) {
    this.#start = isNaN(value)
      ? this.beginning
      : value;
  }

  get end() {
    return this.#end;
  }

  set end(value: number) {
    this.#end = isNaN(value)
      ? this.rangeOffset + this.beginning
      : value;
  }
}

export default Config;
