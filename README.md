<div align="center">

![Logo for silky-smooth-scroll](https://raw.githubusercontent.com/hossammenem/silky-smooth-scrolling/master/silky-smooth-scroll-logo.png)

</div>

<h1 align="center">
  silky smooth scroll Js
  <p style="font-size: 16px; margin-top: 20px; font-weight: normal">A very simple library that animates the scroll wheel animation.</p>
</h1>

# Usage

```js
scroll();
```

_Note: if you are using React you should wrap this function call like this._

```js
if (typeof window !== "undefined") {
  scroll();
}
```

### Parameters:

&nbsp; `target` <div style="margin-left: 20px;">
HTML element that's gonna have the smooth scroll applied to. `Default: <html>`.

  </div>

&nbsp; `options` <div style="margin-left: 20px">
HTML element that's gonna have the smooth scroll applied to. `Default: <html>`.

</div>

&nbsp; &nbsp; `speed` <div style="margin-left: 20px;">Determines the speed of the scroll. `Default: 100`. If used without `smooth`, default is gonna be used `smooth: 14`.

 </div>

&nbsp; &nbsp; `smooth` <div style="margin-left: 20px;">
Determines the smoothnes of the scroll, the greater the value the slower scroll will be.

</div>

&nbsp; &nbsp; `mode` <div style="margin-left: 20px;">
Specifies the mode. Mode types are `'snail' | 'normal' | 'turbo'`. It overrides the `speed` and the `smooth` values if both or one of them is presented.

</div>

&nbsp; &nbsp; `smoothEdgeStop` <div style="margin-left: 20px;">
Determines whether or not to have a smooth stop at the edges of the screen ( top or bot ) or if you want it to be normal, `Default: false` which is the `normal` behavior.

</div>

# Installation

```bash
npm install silky-smooth-scroll
```

if you faced any issues with it in react you can add the react-ts folder in your project like this:

```bash
curl "https://github.com/hossammenem/silky-smooth-scroll/tree/master/react-ts" -o "smoothScroll" # or call the out folder whatever you want
```

_you can also use it in windows powershell since it's gonna call `Invoke-WebRequest` by itself._

# contributions

The main focus right now is to make it compatiple with types so we don't need a whole ts version for it, also to make it compatible with react.

Also it hasn't been tested heavily on differnt browsers, so feel free to open an issue request if you faced any issues with it in your browser.
