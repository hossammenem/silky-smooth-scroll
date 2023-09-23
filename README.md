<div align="center">

![Logo for silky-smooth-scroll](https://raw.githubusercontent.com/hossammenem/silky-smooth-scrolling/master/silky-smooth-scroll-logo.png)

</div>

<h1 align="center"> 
  silky smooth scroll Js
</h1>

#### <p align="center">A very simple library that animates the scroll wheel animation.</p>

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

- `target` <br>
  - HTML element that's gonna have the smooth scroll applied to. `Default: <html>`.

- `options`

  - `speed` <br>
    - Determines the speed of the scroll. `Default: 100`. If used without `smooth`, the default is gonna be used `smooth: 14`.

  - `smooth` <br>
    - Determines the smoothness of the scroll, the greater the value the slower the scroll will be.

  - `mode` <br>
    - Specifies the mode. Mode types are `'snail' | 'normal' | 'turbo'`. It overrides the `speed` and the `smooth` values if both or one of them is presented.

  - `smoothEdgeStop` <br>
    - Determines whether or not to have a smooth stop at the edges of the screen ( top or bot ) or if you want it to be normal, `Default: false` which is the `normal` behavior.

# Installation

```bash
npm install silky-smooth-scroll
```

if you have faced any issues with it in React you can add the react-ts folder in your project like this:

```bash
curl "https://github.com/hossammenem/silky-smooth-scroll/tree/master/react-ts" -o "smoothScroll" # or call the out folder whatever you want
```

_You can also use it in Windows Powershell since it's gonna call `Invoke-WebRequest` by itself._

# contributions

The main focus right now is to make it compatible with types so we don't need a whole ts version for it, and also to make it compatible with react.

Also, it hasn't been tested heavily on different browsers, so feel free to open an issue request if you have faced any issues with it in your browser.
