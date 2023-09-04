import { normalizeWheelDelta, requestFrame } from "./broswersSupport.js";

let isMouseInsideChild = false;
export default function smoothScroll(event, state) {
  var closestScrollParent = getScrollParent(event.target);
  var { speed, smooth, target, pos, moving, edgeStop } = state.getState();
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

  state.setState("pos", calcPos(pos, speed, delta, edgeStop, target));

  if (!moving) frame();

  function frame() {
    state.setState("moving", true);

    const pos = state.getState("pos");
    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += Math.round(delta);

    if (target.scrollTop != pos) requestFrame(frame);
    else state.setState("moving", false);
  }
}

function getScrollParent(node) {
  if (node == null) return null;

  if (node.scrollHeight > node.clientHeight) return node;
  else return getScrollParent(node.parentNode);
}

function isInsideChild(closestScrollParent, delta) {
  return (
    !isMouseInsideChild ||
    (closestScrollParent.scrollTop == 0 && delta > 0) ||
    (closestScrollParent.scrollTop + closestScrollParent.offsetHeight >=
      closestScrollParent.scrollHeight &&
      delta < 0)
  );
}

function calcPos(pos, speed, delta, edgeStop, target) {
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
