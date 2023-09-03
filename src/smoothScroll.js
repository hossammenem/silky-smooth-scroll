import { normalizeWheelDelta, requestFrame } from "./broswersSupport.js";

var isMouseInsideChild = false;
export default function smoothScroll(event, state) {
  let closestScrollParent = getScrollParent(event.target);
  var { target, pos, moving } = state.getState();
  var delta = normalizeWheelDelta(event);

  if (closestScrollParent != target) {
    closestScrollParent.addEventListener("mouseover", () => {
      isMouseInsideChild = true;
    });

    if (
      !isMouseInsideChild ||
      (closestScrollParent.scrollTop == 0 && delta > 0) ||
      (closestScrollParent.scrollTop + closestScrollParent.offsetHeight >=
        closestScrollParent.scrollHeight &&
        delta < 0)
    ) {
      event.preventDefault();
      isMouseInsideChild = false;
    } else if (isMouseInsideChild) {
      event.stopPropagation();
      return false;
    }
  } else {
    event.preventDefault();
  }

  pos += -delta * 70;
  pos = Math.max(
    -120,
    Math.min(pos, target.scrollHeight + 120 - target.clientHeight)
  );
  if (pos < 0 && delta < 0) pos += 170;
  else if (pos > target.scrollHeight - target.clientHeight && delta > 0)
    pos -= 170;

  state.setState("pos", pos);

  if (!moving) frame();

  function frame() {
    state.setState("moving", true);

    const { pos } = state.getState();
    var delta = (pos - target.scrollTop) / 17;

    target.scrollTop += Math.round(delta);

    if (target.scrollTop != pos) requestFrame(frame);
    else state.setState("moving", false);
  }
}

function getScrollParent(node) {
  if (node == null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
}
