// @ts-check
import { targetBodyNormalization } from "./broswersSupport.js";

/**
 * @typedef {Object} Mode
 * @prop {Number} speed
 * @prop {Number} smooth
 */

/**
 * @typedef {"snail" | "normal" | "turbo"} modesTypes
 */

/**
 * @type {{ [key in modesTypes]: Mode; }} MODES
 */
const MODES = {
  snail: {
    speed: 70,
    smooth: 17,
  },
  normal: {
    speed: 100,
    smooth: 14,
  },
  turbo: {
    speed: 120,
    smooth: 12,
  },
};

/**
 * @typedef {Object} state
 * @prop {Number} speed
 * @prop {Number} smooth
 * @prop {Element} target
 * @prop {Number} pos
 * @prop {boolean} moving
 * @prop {Number} edgeStop
 */

/**
 * @typedef {Object} options
 * @prop {Number=} speed - Determines the speed of the scroll.`Default: 100`. If used without `smooth`, default is gonna be used `smooth: 14`.
 * @prop {Number=} smooth - Determines the smoothnes of the scroll, the heigher the slower. `Default: 14`. If used without `speed`, default is gonna be used `speed: 100`.
 * @prop {modesTypes=} mode - Specifies the mode. Mode types are `'snail' | 'normal' | 'turbo'`. It overrides `speed` and the `smooth` values if both or one of them is presented.
 * @prop {boolean=} smoothEdgeStop - Determines whether or not to have a smooth stop at the edges of the screen ( top or bot ) or if you want it to be normal, `Default: false` which is the `normal` behavior.
 */

export default class State {
  constructor() {
    /**  @type {state} */
    this.state = {
      speed: MODES.normal.speed,
      smooth: MODES.normal.smooth,
      target: targetBodyNormalization(),
      pos: 0,
      moving: false,
      // The point of the +1 is that here is an if condition in the
      // smoothScroll.js file that checks whether or not we less than 0
      // ( we are at the top ) so it gives you double the speed to not get
      // stuck at the top after the first scroll, since the most top value is
      // now -speed and not 0, so if we didn't add the boost, you will be
      // stuck at the top if you scrolled for once, because it's gonna
      // update the value from -speed to 0, then you can scroll
      // and since we check after the value has been updated, we will have the
      // value as 0 if we only had -speed, but since we have -speed-1,
      // after we scroll it's gonna be -1
      edgeStop: 0,
    };
    this.state.edgeStop = this.state.speed + 1;

    /**
     * @type {options}
     */
    this.options = {};
  }

  /** @param {options} options */
  setOptions(options) {
    if (options == undefined || Object.keys(options).length == 0 ) return;

    /* Checks if the mode is presetned ( with anything, it doesn't matter 
      because it's gonna override it ) or if there is nothing presented at all.
    */
    if (options.mode || (!options.mode && !options.speed && !options.smooth)) {
      this.state.speed = options.mode
        ? MODES[options.mode].speed
        : MODES.normal.speed;

      this.state.smooth = options.mode
        ? MODES[options.mode].smooth
        : MODES.normal.smooth;
    } else {
      this.state.speed = options.speed ? options.speed : MODES.normal.speed;
      this.state.smooth = options.smooth ? options.smooth : MODES.normal.smooth;
    }

    this.state.edgeStop = options.smoothEdgeStop ? 0 : this.state.speed + 1;
  }

  /**
   *
   * @param {*} key
   * @param {*} val
   */
  setState(key, val) {
    this.state[key] = val;
  }

  /**
   *
   * @param {*} key
   * @returns {*}
   */
  getState(key) {
    if (key) return this.state[key];
    return this.state;
  }
}
