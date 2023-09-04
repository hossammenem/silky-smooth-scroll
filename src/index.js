/*
* CREDITS:

*/

import {
  addEventListeners,
  targetBodyNormalization,
} from "./broswersSupport.js";
import smoothScroll from "./smoothScroll.js";
import { State } from "./store.js";

// TODO: test to see if there are any issues with passing params
// (conflicts with event and elem)
export default function scroll(_, elm, options) {
  const state = new State();
  state.initState();

  if (elm == undefined) state.setState("target", targetBodyNormalization());
  else state.setState("target", elm);

  const target = state.getState("target");

  state.setState("pos", target.scrollTop);

  state.setOptions(options);

  addEventListeners(target, state, smoothScroll);
}

document.addEventListener("DOMContentLoaded", scroll);
