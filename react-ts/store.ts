import { targetBodyNormalization } from "./browsersSupport";

type modes = "snail" | "normal" | "turbo";

type ModesType = {
  [key in modes]: {
    speed: number;
    smooth: number;
  };
};

const MODES: ModesType = {
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

export interface IState {
  speed: number;
  smooth: number;
  pos: number;
  moving: boolean;
  target: Element;
  edgeStop: number;
  [key: string]: any;
}

export interface IOptions {
  speed?: number;
  smooth?: number;
  mode?: modes;
  smoothEdgeStop?: boolean;
}

export default class State {
  state: IState;
  options: IOptions;
  constructor() {
    this.state = {
      speed: MODES.normal.speed,
      smooth: MODES.normal.smooth,
      target: targetBodyNormalization(),
      pos: 0,
      moving: false,
      edgeStop: 0,
    };
    this.state.edgeStop = this.state.speed + 1;

    this.options = {};
  }

  setOptions(options: IOptions) {
    if (Object.keys(options).length == 0) return;

    if (options.mode || (!options.mode && !options.speed && !options.smooth)) {
      this.state.speed = options.mode
        ? MODES[options.mode].speed
        : MODES.normal.speed;

      this.state.smooth = options.mode
        ? MODES[options.mode].smooth
        : MODES.normal.smooth;
    } else {
      this.state.speed = options.speed ?? MODES.normal.speed;
      this.state.smooth = options.smooth ?? MODES.normal.smooth;
    }

    this.state.edgeStop = options.smoothEdgeStop ? 0 : this.state.speed + 1;
  }

  setState(key: string, val: Element | boolean | number) {
    this.state[key] = val;
  }

  getState(key?: string) {
    if (key) return this.state[key];
    return this.state;
  }
}
