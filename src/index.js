/*
* CREDITS:

*/

import {
  addEventListeners,
  targetBodyNormalization,
} from "./broswersSupport.js";
import smoothScroll from "./smoothScroll.js";
import { State } from "./store.js";

export default function scroll(_, elm, options) {
  const state = new State();

  if (elm == undefined) state.setState("target", targetBodyNormalization());
  else state.setState("target", elm);

  const { target } = state.getState();

  state.setState("pos", target.scrollTop);

  addEventListeners(target, state, smoothScroll);
}

document.addEventListener("DOMContentLoaded", scroll);
