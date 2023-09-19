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


var requestFrame;

/**
 *
 * @param {Element} target
 * @param {*} state
 * @param {Function} func
 */
export function eventListeners(target, state, func) {
  function scrollHandler(e) {
    func(e, state);
  }

  function clickHandler() {
    state.setState("pos", target.scrollTop);
  }

  /* TODO: I think there is something for rate limiting for screens with higher refresh rate ( heighr than 60 )
   */
  requestFrame =
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
    };

  target.addEventListener("wheel", scrollHandler, {
    passive: false,
  });

  target.addEventListener("mousewheel", scrollHandler, {
    passive: false,
  });

  target.addEventListener("DOMMouseScroll", scrollHandler, {
    passive: false,
  });

  /* those event listeneres are important for the user to be able
    to drag the scroll bar with the mouse itself

    mousedown to prevent the scroll bar from trying to keep on going back to
    the last pos that we scrolled to ( by the wheel )
    */
  target.addEventListener("mousedown", clickHandler);

  // mouseup to get the exact pos that the user has stopped at
  target.addEventListener("mouseup", clickHandler);
}

export { requestFrame };