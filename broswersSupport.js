/*
* CREDITS:

*/

const requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
}()

function normalizeWheelDelta(e){
  if(e.detail){
    if(e.wheelDelta)
      return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
    else
      return -e.detail/3 // Firefox
  } else
    return e.wheelDelta/120 // IE,Safari,Chrome
}


function targetBodyNormalization(event) {
  /*var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement  
              */
  /* if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body)
  */
}


function eventListeners(target, func) {
  //target.addEventListener('wheel', scrolled, { passive: false })
	//target.addEventListener('mousewheel', scrolled, { passive: false })
	//target.addEventListener('DOMMouseScroll', scrolled, { passive: false })
}