---
tag: tech
desc: 原创 Sketch 画板&命名管理插件
l: http://qn.canisminor.cc/2018-08-18-name.png
---

# Name Organizer

![](https://img.shields.io/github/release/canisminor1990/sketch-name-organizer.svg)

**Sort Artboards**

按画板所在的 x,y 坐标给画板排序，并给画板加上顺序前缀

**Sort Artboards Without Numbers**

排序画板，但不加数字前缀

**Rename Layers**

美化图层名，并根据图层所应用的文字、图层样式，或所隶属的 symbol 重名图层（全局）

## 使用说明

### Name Organizer

![350px](http://qn.canisminor.cc/2018-03-12-rm-dialog-1.png)

使用 `⌃` + `⌘` + `N` 打开插件弹窗

![300px](http://qn.canisminor.cc/2017-09-24-115417.jpg)

### Rename Layers

美化图层名，并根据图层所应用的文字、图层样式，或所隶属的 symbol 重名图层（全局）

![](http://qn.canisminor.cc/2017-09-24-115441.jpg)

### Name Format

- CamelCase

```white
Foo Bar => FooBar
--for-bar-- => FooBar
__FOO_BAR__ => FooBar
```

- camelCase

```white
Foo Bar => fooBar
--for-bar-- => fooBar
__FOO_BAR__ => fooBar
```

- kebab-case

```white
Foo Bar => foo-bar
FooBar => foo-bar
__FOO_BAR__ => foo-bar
```

- snake_case

```white
Foo Bar => foo_bar
--for-bar-- => foo_bar
FooBar => foo_bar
```

- Start Case

```white
FooBar => Foo Bar
--for-bar-- => Foo Bar
__FOO_BAR__ => Foo Bar
```

### Sort Artboards

按画板所在的 x,y 坐标给画板排序，并给画板加上顺序前缀 (格式为 01:图层名),
然后按顺序重新排列画板

![](http://qn.canisminor.cc/2017-09-24-115514.jpg)

![](http://qn.canisminor.cc/2017-09-24-115428.jpg)

### 使用 Runner 开启

- `⌘` + `'` 打开 **Runner**;
- 输入 **name**;

![300px](http://qn.canisminor.cc/2017-09-24-115537.jpg)

**Input**

```white
data display / Cell/01
```

**Output**

```white
DataDisplay / Cell / 01
```

## 安装方法

![](https://img.shields.io/github/downloads/canisminor1990/sketch-name-organizer/total.svg)

### 直接下载

- [下载 ZIP 包](https://github.com/canisminor1990/sketch-name-organizer/archive/master.zip) 解压
- 打开 **NameOrganizer.sketchplugin** 即可自动安装

### 使用 Sketchpacks 安装

[![150px](http://qn.canisminor.cc/2017-09-24-115227.jpg)](https://sketchpacks.com/canisminor1990/sketch-select/install)

### 使用 Runner 安装

- `⌘` + `'` 打开 **Runner**;
- 切换至 **install** 标签;
- 输入 **NameOrganizer**;
- 选择  **Name Organizer** 并 回车.

[![150px](http://qn.canisminor.cc/2017-09-24-115206.jpg)](http://bit.ly/SketchRunnerWebsite)
