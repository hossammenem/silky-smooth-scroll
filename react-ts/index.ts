import smoothScroll from "./smoothScroll";
import State, { IOptions } from "./store";
import { eventListeners } from "./browsersSupport";

export default function scroll(
  elm?: HTMLElement | null | IOptions,
  options?: IOptions
) {
  const state = new State();

  // if an object was passed, therefore the elm was meant to be the options
  // so we have to handle it like this since js doesn't support functon overloading
  // I really hate this synatx btw...
  if (elm && typeof elm == "object") state.setOptions(elm as IOptions);

  if (elm && elm instanceof HTMLElement)
    state.setState("target", elm as Element);

  const target = state.getState("target");

  state.setState("pos", target.scrollTop);

  state.setOptions(options ?? {});

  eventListeners(target, state, smoothScroll);
}
