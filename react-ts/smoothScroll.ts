import { normalizeWheelDelta } from "./browsersSupport";
import { requestFrame } from "./browsersSupport";
import State, { IState } from "./store";

let isMouseInsideChild: boolean = false;

export default function smoothScroll(event: Event | WheelEvent, state: State) {
  var { speed, smooth, target, pos, moving, edgeStop }: IState =
    state.getState();

  var closestScrollParent = getScrollParent(
    event?.target as HTMLElement,
    target
  );

  var delta = normalizeWheelDelta(event);

  if (closestScrollParent != target) {
    closestScrollParent.addEventListener("mouseover", () => {
      isMouseInsideChild = true;
    });

    if (isInsideChild(closestScrollParent, delta)) {
      event.preventDefault();
      isMouseInsideChild = false;
    } else if (isMouseInsideChild) {
      event.stopPropagation();
      return false;
    }
  } else {
    event.preventDefault();
  }

  if (!moving)
    state.setState(
      "pos",
      calcPos(target.scrollTop, speed, delta, edgeStop, target)
    );
  else state.setState("pos", calcPos(pos, speed, delta, edgeStop, target));

  if (!moving) frame();

  function frame() {
    state.setState("moving", true);

    const pos = state.getState("pos");
    const delta = (pos - target.scrollTop) / smooth;

    let isNegativeFLoat = delta < 0 && delta > -1;

    target.scrollBy({
      top: isNegativeFLoat ? -1 : Math.ceil(delta),
      behavior: "instant",
    });

    if (target.scrollTop != pos) requestFrame(frame);
    else state.setState("moving", false);
  }
}

function getScrollParent(node: HTMLElement, target: Element): HTMLElement {
  if (
    node == target ||
    ((window.getComputedStyle(node).overflowY == "auto" ||
      window.getComputedStyle(node).overflowY == "scroll") &&
      node.scrollHeight > node.clientHeight)
  )
    return node;
  else return getScrollParent(node.parentNode as HTMLElement, target);
}

function isInsideChild(closestScrollParent: HTMLElement, delta: number) {
  return (
    !isMouseInsideChild ||
    (closestScrollParent.scrollTop == 0 && delta > 0) ||
    (closestScrollParent.scrollTop + closestScrollParent.offsetHeight >=
      closestScrollParent.scrollHeight &&
      delta < 0)
  );
}

function calcPos(
  pos: number,
  speed: number,
  delta: number,
  edgeStop: number,
  target: Element
): number {
  pos += -delta * speed;
  pos = Math.max(
    -edgeStop,
    Math.min(pos, target.scrollHeight + edgeStop - target.clientHeight)
  );
  if (
    (pos < 0 && delta < 0) ||
    (pos > target.scrollHeight - target.clientHeight && delta > 0)
  )
    pos += -delta * speed;

  return pos;
}
