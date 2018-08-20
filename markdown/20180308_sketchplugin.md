---
tag: tech
desc: Sketch 插件开发 - skpm & webview
l: http://qn.canisminor.cc/2018-08-18-skpm.png
---

# Skpm 插件开发

拿 Sketch 49 的新 [JS API](http://developer.sketchapp.com/reference/api/) 重构了一边 [SketchSelect](https://github.com/canisminor1990/sketch-select) 和 [NameOrganizer](https://github.com/canisminor1990/sketch-name-organizer) 插件，感受：Sketch JS API 文档比之前清晰太多，还带了示例代码片段，官方终于想起有这么个文档了 🤭，但目前暴露的属性非常不全，只能说是阉割版，比如 TextLayer 的字体，ShapeLayer 的混合模式投影等，还有诸如导出，锁定，隐藏等状态都无法直接取到，还是得用其丑无比的 CocoaScript 方法。

除了换 API，Webview 方面也重构了一遍，skpm 提供了使用 webpack 的[官方示例文件](https://github.com/skpm/with-webview/tree/master/template)，这边我因为使用 roadhog/dva 全家桶，所以魔改了一遍。

## 安装

- [skpm](https://github.com/skpm/skpm): 是 sketch 第三方开发工具集，提供调试/打包/发布等开发插件常用的功能。
- @skpm/builder: skpm 开发包
- [sketch-module-web-view](https://github.com/skpm/sketch-module-web-view): skpm 提供的 webview 包
- [roadhog](https://github.com/sorrycc/roadhog) / [dva](https://github.com/dvajs/dva): 阿里 react/redux/webpack 全家桶
- cross-env: 设置环境变量
- concurrently: 进程多开

```bash
# 全局安装skpm包
$ npm i -g skpm
# 安装依赖
$ yarn add @skpm/builder sketch-module-web-view dva
$ yarn add roadhog cross-env concurrently --dev
```

### package 配置

- package.json

```json
{
  "engines": {
    "sketch": ">=49.0"
  },
  "skpm": {
    "name": "plugin-name",
    "manifest": "src/manifest.json",
    "main": "plugin.sketchplugin",
    "assets": ["dist"]
  },
  "scripts": {
    "start": "concurrently \"yarn start:panel\" \"yarn start:plugin\"",
    "start:plugin": "cross-env NODE_ENV=development skpm-build --watch",
    "start:panel": "roadhog dev",
    "build": "yarn build:panel && yarn build:plugin",
    "build:plugin": "cross-env NODE_ENV=production skpm-build",
    "build:panel": "roadhog build",
    "publish": "skpm publish",
    "link": "skpm-link"
  }
}
```

### skpm 配置

- name：插件名称
- manifest：插件配置文件 `manifest.json` 的位置
- main: 打包后输出的插件文件
- assets(数组): 资源文件，同 webpack 中的 public

> ⚠️ 这里把 webview 编译后的 dist 当做资源文件，编译插件时会自动复制过去。

### roadhog 配置

- .webpackrc.js

```js
export default {
	entry             : './panel/index.js',
	ignoreMomentLocale: true,            : {
	html              : {
		'template': './panel/index.ejs'
	},
	define            : {
		'$dirname': __dirname,
		'$isDev'  : process.env.NODE_ENV === 'development'
	},
};
```

📘 [roadhog 官方文档](https://github.com/sorrycc/roadhog)

### 文件结构：

```bash
+ public              # webview资源文件(插件使用的也一并放入)
	- icon/png
	...

+ panel               # webview目录
	+ components
	+ models
	+ routes
	- index.js
	- index.ejs
	...
+ src                 # 插件目录
	- manifest.json   # 插件配置文件
	- index.js
	...
- .webpackrc.js       # roadhog配置文件，用于webview
- .appcast.xml        # sketch插件自动更新信息
- package.json

# 编译后

+ dist                # 1.webview build
	- index.html
	- index.js
	- index.css
	- icon/png
	...
+ plugin.sketchplugin # 2.plugin build
	+ Contents
		+ Resources   # webview/资源文件
			- index.html
			- index.js
			- index.css
			- icon/png
			...
		+ Sketch      # 插件部分
			- manifest.json
			- index.js
			- ...
```

## 使用

```bash
# 开发 NODE_ENV=development
# 同时启动并监听 plugin 和 webview
# 如果不想每次自动执行插件, 可把--run去除
$ yarn start

# 打包 NODE_ENV=development
$ yarn build
```

### 创建 Panel

- src/index.js

```js
import WebUI= require('sketch-module-web-view';

// 判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development';
// 开发环境中使用浏览器调试地址
const Panel = isDev ? 'http://localhost:8000' : 'index.html';

export default context => {
  // 创建Webview Panel
  const panelUI = new WebUI(context, Panel, {
    identifier: 'plugin.panel', // 窗口id
    x: 0,
    y: 0,
    width: 340,
    height: 624,
    title: 'Sketch Select',
    onlyShowCloseButton: true,
    hideTitleBar: false,
    shouldKeepAround: true,
    resizable: false,
    handlers: {
      // plugin 和 webview 之间的通讯方法
    },
  });
};
```

> 📘 [sketch-module-web-view 官方文档](https://github.com/skpm/sketch-module-web-view)

### 通讯方法

- src/index.js

```js
panelUI.handlers = {
  // webview 远程调用 plugin 的方法
  onClick(callback) {
    console.log(callback);

    // plugin 远程调用 webview 中的方法
    const data = JSON.stringify({ ...Data });
    panelUI.eval(`remoteFunc(${data})`);
  }
};
```

- panel/index.js

```js
import pluginCall= require('sketch-module-web-view/client';

// webview 远程调用 plugin 中的方法
pluginCall('onClick', callback);

// plugin 远程调用 webview 的方法
window.remoteFunc = data => {
  const Data = JSON.parse(data);
  console.log(Data);
};
```

## 调试

![nozoom](https://user-images.githubusercontent.com/3254314/32320758-1dc414d8-bfbf-11e7-9282-1d57fc53874d.png)

- 安装 [**sketch-dev-tools**](https://github.com/skpm/sketch-dev-tools)

![full](http://qn.canisminor.cc/2018-03-08-dev-1.png)

![full](http://qn.canisminor.cc/2018-03-08-dev-2.png)

sketch-dev-tool 可以在 sketch 中开启类似 Chrome 开发者工具的面板，方便调试，还可以直接查阅当前 sketch 文件的图层数据结构，总之非常方便。如果想在 sketch 中调试 webview，可以在 webview 中写一个 console 方法，把需要打印的内容传给 plugin 进行 debug。

# 发布

- 打开 GitHub → Setting → Developer settings
- 在 [Personal access tokens](https://github.com/settings/tokens) 中生成一个 token
- 需要有操作 repo 权限
- 使用 skpm 进行登录 (只需一次)

```bash
$ skpm login <github-token>
```

- 发布版本

```bash
$ skpm publish <new-version>
```

发布命令会执行下操作:

- 修改 `package.json` 版本号
- git tag 当前版本
- 把 `plugin.sketchplugin` 文件压缩上传至 github releases 中
- 更新 `.appcast.xml` 文件, 通知 sketch 更新此插件
