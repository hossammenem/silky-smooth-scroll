/*
 * CREDITS to Manuel Otto for his answer: https://stackoverflow.com/a/47206289
 * that helped me with the scroll animation
 */

import { eventListeners } from "./broswersSupport.js";
import smoothScroll from "./smoothScroll.js";
import State from "./store.js";

/**
 * @param {HTMLElement | undefined} elm - The target elemenet that's gonna have the smooth scroll on, `Default: <html>`
 * @param {import("./store.js").options} options
 */
export default function scroll(elm, options) {
  const state = new State();

  // if an object was passed, therefore the elm was meant to be the options
  // so we have to handle it like this since js doesn't support functon overloading
  // I really hate this synatx btw...
  if (elm && typeof elm == "object") state.setOptions(elm);

  if (elm && elm instanceof HTMLElement)
    state.setState("target", elm);

  const target = state.getState("target");

  state.setState("pos", target.scrollTop);

  state.setOptions(options ?? {});

  eventListeners(target, state, smoothScroll);
}