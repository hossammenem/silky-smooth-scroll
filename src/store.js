// TODO: handel types with JSDoc

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

export class State {
  constructor() {
    this.state = {
      speed: undefined,
      smooth: undefined,
      target: undefined,
      pos: 0,
      moving: false,
      edgeStop: undefined,
    };

    this.options = {
      speed: undefined,
      smooth: undefined,
      mode: undefined,
      smoothEdgeStop: false,
    };
  }

  initState() {
    this.state.speed = MODES.normal.speed;
    this.state.smooth = MODES.normal.smooth;
    this.state.edgeStop = this.options.smoothEdgeStop
      ? 0
      : this.state.speed + 1;
  }

  setOptions(options) {
    if (options == {} || options == undefined) return;

    if (
      (options.mode && options.speed) ||
      !(options.mode && options.speed) ||
      options.mode
    ) {
      this.state.speed = options.mode ? MODES[options.mode].speed : 120;
      this.state.smooth = options.mode ? MODES[options.mode].smooth : 12;
    } else {
      this.state.speed = options.speed;
      this.state.smooth = options.smooth ? options.smooth : 12;
    }
  }

  setState(key, val) {
    this.state[key] = val;
  }

  getState(key) {
    if (key) return this.state[key];
    return this.state;
  }
}
