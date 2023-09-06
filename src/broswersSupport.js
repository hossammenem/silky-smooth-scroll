// TODO: I think there is something for rate limiting for screens with higher
// refresh rate ( heighr than 60 )
export const requestFrame = 
    window.requestAnimationFrame ||
    // @ts-ignore
    window.webkitRequestAnimationFrame ||
    // @ts-ignore
    window.mozRequestAnimationFrame ||
    // @ts-ignore
    window.oRequestAnimationFrame ||
    // @ts-ignore
    window.msRequestAnimationFrame ||
    function (func) {
      window.setTimeout(func, 1000 / 50);
    }

export function normalizeWheelDelta(e) {
  if (e.detail) {
    if (e.wheelDelta)
      return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1); // Opera
    else return -e.detail / 3; // Firefox
  } else return e.wheelDelta / 120; // IE,Safari,Chrome
}

export function targetBodyNormalization() {
  var target =
    document.scrollingElement ||
    document.documentElement ||
    document.body.parentNode ||
    document.body;

  return target;
}

/**
 * 
 * @param {Element} target 
 * @param {*} state 
 * @param {Function} func 
 */
export function addEventListeners(target, state, func) {
  target.addEventListener("wheel", (e) => func(e, state), {
    passive: false,
  });

  target.addEventListener("mousewheel", (e) => func(e, state), {
    passive: false,
  });

  target.addEventListener("DOMMouseScroll", (e) => func(e, state), {
    passive: false,
  });

  // those event listeneres are important for the user to be able
  // to use the scroll bar

  // mousedown to prevent the scroll bar from trying to keep on going back to
  // the last pos that we scrolled to ( by the wheel )
  target.addEventListener("mousedown", () => {
    state.setState("pos", target.scrollTop);
  });

  // mouseup to get the exact pos that the user has stopped at
  target.addEventListener("mouseup", () => {
    state.setState("pos", target.scrollTop);
  });
}
