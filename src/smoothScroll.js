import { normalizeWheelDelta, requestFrame } from "./broswersSupport.js";

/** @type {boolean} */
let isMouseInsideChild = false;

/**
 * @param {*} event
 * @param {*} state
 * @returns {void | false}
 */
export default function smoothScroll(event, state) {
  /** @type {import("./store.js").state}*/
  var { speed, smooth, target, pos, moving, edgeStop } = state.getState();

  var closestScrollParent = getScrollParent(event.target, target);

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

/**
 *
 * @param {} node
 * @param {HTMLElement} target
 * @returns {*}
 */
function getScrollParent(node, target) {
  if (node == null) return null;

  if (
    node == target ||
    ((window.getComputedStyle(node).overflowY == "auto" ||
      window.getComputedStyle(node).overflowY == "scroll") &&
      node.scrollHeight > node.clientHeight)
  )
    return node;

  if (node.scrollHeight > node.clientHeight) return node;
  else return getScrollParent(node.parentNode, target);
}

/**
 *
 * @param {HTMLElement} closestScrollParent
 * @param {Number} delta
 * @returns {boolean}
 */
function isInsideChild(closestScrollParent, delta) {
  return (
    !isMouseInsideChild ||
    (closestScrollParent.scrollTop == 0 && delta > 0) ||
    (closestScrollParent.scrollTop + closestScrollParent.offsetHeight >=
      closestScrollParent.scrollHeight &&
      delta < 0)
  );
}

/**
 * @param {Number} pos
 * @param {Number} speed
 * @param {Number} delta
 * @param {Number} edgeStop
 * @param {Element} target
 * @returns {Number} pos
 */
function calcPos(pos, speed, delta, edgeStop, target) {
  pos += -delta * speed;
  pos = Math.max(
    -edgeStop,
    Math.min(pos, target.scrollHeight + edgeStop - target.clientHeight)
  );

  /* 
    
  */
  if (
    (pos < 0 && delta < 0) ||
    (pos > target.scrollHeight - target.clientHeight && delta > 0)
  )
    pos += -delta * speed;

  return pos;
}
