import { useEffect } from "react";
import State from "./store";

// I wasn't able to use a type here, so I just used any
// and I don't think that is it gonna be easy to use a type for 'e' here
export function normalizeWheelDelta(e: any) {
  if (e.detail) {
    if (e.wheelDelta)
      return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1); // Opera
    else return -e.detail / 3; // Firefox
  } else return e.wheelDelta / 120; // IE,Safari,Chrome
}

export function targetBodyNormalization(): Element {
  var target: Element =
    document.scrollingElement ||
    document.documentElement ||
    document.body.parentNode ||
    document.body;

  return target;
}

// not sure about this type yet.
type RequestFrameType = (callback: FrameRequestCallback) => number | undefined;

var requestFrame: RequestFrameType;

export function eventListeners(
  target: HTMLElement,
  state: State,
  func: (e: WheelEvent | Event, state: State) => void
) {
  function scrollHandler(e: WheelEvent | Event) {
    func(e, state);
  }

  function clickHandler() {
    state.setState("pos", target.scrollTop);
  }

  useEffect(() => {
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
      function (func: Function) {
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
    return () => {
      /* we have to delete them this way because if the target is <html>
      it cannot be cloned so we won't be able to use something like
      target.replaceWith(target.clone(true)); unfortunately
      */
      target.removeEventListener("wheel", scrollHandler);
      target.removeEventListener("DOMMouseScroll", scrollHandler);
      target.removeEventListener("mousewheel", scrollHandler);
      target.removeEventListener("mouseup", clickHandler);
      target.removeEventListener("mousedown", clickHandler);
    };
  }, []);
}

export { requestFrame };
