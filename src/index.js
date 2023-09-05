/*
* CREDITS:

*/

import { addEventListeners } from "./broswersSupport.js";
import smoothScroll from "./smoothScroll.js";
import State from "./store.js";

/**
 * @param {Element | undefined} elm - The target elemenet that's gonna have the smooth scroll on, `Default: <html>`
 * @param {import("./store.js").options} options
 */
export default function scroll(elm, options) {
  const state = new State();

  if (elm) state.setState("target", elm);

  /** @type {Element} */
  const target = state.getState("target");

  state.setState("pos", target.scrollTop);

  state.setOptions(options);

  addEventListeners(target, state, smoothScroll);
}