let custom_scroll = document.getElementById("test");
let target = custom_scroll.scrollTop;
let moving = false;
var pos = custom_scroll.scrollTop;

function smoothScrolling(event) {
  event.preventDefault();
  var delta = normalizeWheelDelta(event);

  pos += -delta * 70;
  pos = Math.max(
    -120,
    Math.min(pos, custom_scroll.scrollHeight + 120 - custom_scroll.clientHeight)
  );

  if (!moving) frame();

  function frame() {
    moving = true;

    var delta = (pos - custom_scroll.scrollTop) / 17;

    custom_scroll.scrollTop += Math.round(delta);

    if (pos != custom_scroll.scrollTop) requestFrame(frame);
    else moving = false;
  }
}

custom_scroll.addEventListener("wheel", smoothScrolling, { passive: false });

custom_scroll.addEventListener("mousedown", (e) => {
  pos = custom_scroll.scrollTop;
});

custom_scroll.addEventListener("mouseup", (e) => {
  pos = custom_scroll.scrollTop;
});
