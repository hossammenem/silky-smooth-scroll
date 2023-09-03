// TODO #1: add the options object
// TODO #2: handel types with JSDoc
export class State {
  constructor() {
    this.state = {
      target: undefined,
      pos: 0,
      moving: false,
      isMouseInsideChild: false,
    };

    this.options = {
      speed: 120,
      smooth: 12,
      mode: undefined, // "normal" | "smooth" | "turbo"
      smoothEdgeStop: false,
      scrollableChildBehavior: "default", // "default" | idk what to call this mode but it's just gonna prevent it from scrolling the parent if we are at the edges
      applyForChildren: false
    };
  }

  setState(key, val) {
    this.state[key] = val;
  }

  getState() {
    return this.state;
  }
}
