This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## What's this?

Compose a blackboard to the image like a 工事写真.
Inspired by the article at [「自撮り工事写真棒」でプラモライフを記録していこうヨシ！ | nippper](https://nippper.com/2020/06/4143/).

## Stocks

[The best Favicon Generator (completely free)](https://favicon.io/emoji-favicons/construction/)

## MEMO

### 類似アプリ先行事例

[電子黒板　工事用黒板　表示機能](http://www.civilworks.jp/software/photomaster2/kokuban.html)

### SVG を画像に変換

[SVGを画像に変換してダウンロードする方法 - Qiita](https://qiita.com/skryoooo/items/a37455bef54321a6195a)

```javascript
var svg = document.querySelector("svg");
var svgData = new XMLSerializer().serializeToString(svg);
var canvas = document.createElement("canvas");
canvas.width = svg.width.baseVal.value;
canvas.height = svg.height.baseVal.value;

var ctx = canvas.getContext("2d");
var image = new Image;
image.onload = function(){
    ctx.drawImage( image, 0, 0 );
    var a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.setAttribute("download", "image.png");
    a.dispatchEvent(new MouseEvent("click"));
}
image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svgData))); 
```

[javascript - Save inline SVG as JPEG/PNG/SVG - Stack Overflow](https://stackoverflow.com/questions/28226677/save-inline-svg-as-jpeg-png-svg)

```javascript
var btn = document.querySelector('button');
var svg = document.querySelector('svg');
var canvas = document.querySelector('canvas');

function triggerDownload (imgURI) {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  var a = document.createElement('a');
  a.setAttribute('download', 'MY_COOL_IMAGE.png');
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
}

btn.addEventListener('click', function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var data = (new XMLSerializer()).serializeToString(svg);
  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  var url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    var imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
  };

  img.src = url;
});
```

```html
<button>svg to png</button>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="200">
  <rect x="10" y="10" width="50" height="50" />
  <text x="0" y="100">Look, i'm cool</text>
</svg>

<canvas id="canvas"></canvas>
```

### SVG を React コンポーネントに変換

[SVGファイルをズバッとReact Componentsに変換する - wadackel.me](https://blog.wadackel.me/2016/react-svg-converter/)

https://www.npmjs.com/package/react-svg-converter

### 画像取得処理

[Reactで画像プレビューを作る - Qiita](https://qiita.com/maru_u/items/f3aedb419443cc9b83f3)

```javascript
var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

var Post = React.createClass({

    getInitialState(){
        return {
            image_src: ""
        };
    },

    handleChangeFile: function(e) {
        var files = e.target.files;
        var image_url = files.length===0 ? "" : createObjectURL(files[0]);
        this.setState({image_src: image_url});

    },

    render(){
        return(
            <div>
                <input type="file" ref="file" onChange={this.handleChangeFile} />
                <img src={this.state.image_src} />
                <button onClick={this.clickPostBtn} type="button">投稿する</button>
            </div>
        );
    }
});
```

```javascript
handleChangeFile: function(e) {
    var files = e.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function(){
        this.setState({image_src: reader.result});
    }.bind(this)

},
```

[Rails + ReactでS3に画像データをuploadするまで - Zeals TECH BLOG](https://tech.zeals.co.jp/entry/2019/05/21/135544)

### CANVAS 生成処理

[Fabric.js Javascript Canvas Library](http://fabricjs.com/)

[canvasを便利にするfabric.jsの紹介と導入方法 - Qiita](https://qiita.com/seimiyajun/items/7c99271f0c720feac306)

### React

[最初に一回だけ動くuseEffect（componentDidMount的な） - Qiita](https://qiita.com/sijiaoh/items/95aba67e589515a06b31)

[How To Use The HTML Drag-And-Drop API In React — Smashing Magazine](https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/)
