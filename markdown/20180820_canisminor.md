---
tag: design
desc: Design & development records of personal site
l: http://qn.canisminor.cc/2018-08-27-canisminor-l.png
s: http://qn.canisminor.cc/2018-08-27-canisminor-s.png
---

# CanisMinor

## TECH

先列举下这次个站开发使用到的一些主要的包技术栈：

**前端**

- `React` + `Redux` ( `dva` )
- `Webpack` ( `Roadhog` )
- `Styled Components`
- `Ant Motion`

**后端**

- `NodeJs` + `Express`
- `LowDB`
- **Blog: **
  - `Markdown`
  - `Gulp`

**服务**

- 阿里云
- 七牛
- Mailgun

![](http://qn.canisminor.cc/2018-08-24-cm-1.png)

## Design

![](http://qn.canisminor.cc/2018-08-24-cm-2.png)

#### 字体选择

在英文字体的选择上，使用了 Airbnb 最新推出的 Cereal 字族，而没有选择之前最常用的 Futural 与 Gotham，原因是其弥补了前两者在我个人感官上的的一些缺点，Futura 曾是 BBC、宜家等品牌的选择，在 500 字重的表现上很惊艳，但是当涉及到之后的自重就变得一团黑而且横向扩张非常恐怖，字重间的调整并不平滑。而 Gotham 具有漂亮的几何机构在网页上的显示效果也具有很高的清晰度与可读性，也是腾讯 ISUX 当前的默认英文字体，但是由于整个字体设计较扁和中文搭配阅读时会有一些不自然感。Cereal 在我看来既拥有 Gotham 般优美的几何机构，同时会更加具有时代感与俏皮一些，自重间国度自然，不同自重的横向扩张也控制得非常到位。

中文字体的选择上出于显示器阅读的原因并没有选择兰亭字族，而苹方在与 Cereal 的亲和力也会高于 Noto Sans 思源字族。

代码片段的字体选用了我习惯的 Hack 字族，Monaco 的完美替代品，也是我所有 IDE 的设定字体。

![](http://qn.canisminor.cc/2018-08-27-cm-3.png)

#### 字号&行高管理

字号的算法参考了 Ant.Design 3.0 的设计分享，不同的是我并不是工具类应用因此在初始字号的选择上为 16px (1rem) 而非 Antd 的 14px，方便于 UI 控件单位控制。

> f0 我们可以理解成为起始字号，也就是主字体，我们前面有推导出来为 14px。r 的值决定了这条曲线的趋势，可以理解成字阶的生长一个趋势。这个数值的启发来源于自然常数 e，这是一个无理数，大约等于 2.71828。n 则代表了我们如何在曲线上取对应的数字，决定这个数值大小的关键在于我们希望相邻的两个字号之间的差距是大还是小。Spencer 在他的文章中有提到过，建议 n 在选择上可以参考音律的规则，比如说 3 音阶、4 音阶、5 音阶、7 音阶等等，这样可以令字阶呈现出一种自然的节奏感。在做了大量的页面落地试验之后我们将这个数值定成 5。映射到音乐的世界中，正好是 5 音阶。5 声音阶是很多古典乐遵循的规律，比如我国古代的宫商角徵羽。
>
> 我们将三个数值代入到前面公式之后，可以得到一组关于字阶的原始数组。它们是基于 14px 的字体，以自然常数的生长律，同时用 5 声音阶的单元切分方式得出来的。
>
> 在第二个问题的解决过程，字阶的规律是一个幂函数。决定这个幂函数结果的变量是起始字号、生长律以及单元等分的次数。目前我们只取了曲线上的 10 个字号作为默认的字阶，当设计对字体有更大的要求的时候，同样可以基于这个规律快速锁定我们想要的字号。
>
> **OK，有了字阶，我们就可以进一步推导第三个问题：多大的行高是自然的？**
>
> 行高大家都知道指的是一个字体外框的肉眼不可见的部分。在 Ant Design 的第一版行高计算思路中，我们用字体乘一个固定的倍数去定义行高。但在实际设计中，我们发现这样的方式会有一个问题，当字体越大，行高也会越来越大。在字体 2.0 的时候，我们在字阶上做了一个分水岭，超过某一个字号的字体行高一律乘以一倍。但以上这两种做法会增加我们在排版布局层面的规则复杂度，同时不便于计算和记忆。在 3.0 这个阶段，我们决定尝试用『自然』来解决这一问题。首先，我们需要定义出行高的计算规律，除了字阶的计算公式之外，我们还有另外两个信息的输入：
>
> - 设计师希望字体高度和行高之间能从静态黄金比出发。
> - 但是基于设计经验，同时不给布局造成压力，我们希望行高的增长速度能够随着字体的增长逐渐趋向于缓慢，并且最终不要超过 1 倍。
>
> 借由这样的思路。我们在字号的基础之上将增长率做了一个自然律反相的负增长，从而定义了行高的计算公式。根据这一公式，同样的我们得到了一组原始的行高数组。

![](http://qn.canisminor.cc/2018-08-24-cm-4.png)

由于 Antd 分享并没有展示实际的算法，于是我花了些时间推导了一份字号与行高的实际算法，用于在网站上直接引用。

![](http://qn.canisminor.cc/2018-08-24-cm-5.png)

最终的效果展示（左），与常见的 1.5 倍行距（右）相比，显得更有节奏感，同时在大字号的选择上也不会手足无措。

![](http://qn.canisminor.cc/2018-08-24-cm-7.png)![](http://qn.canisminor.cc/2018-08-24-cm-6.png)

#### 自适应区间

- **Desktop - XXL: 1580px**
- Desktop - XL: 1280px
- Desktop - L: 1080px
- **Mobile - M: 780px**
- Mobile - S: 580px
- Mobile - XS: 380px

得益于 `styled-components` 的使用，各种样式与媒体查询可以用 JS 轻松管理。

```js
const screen = {
  XXL: 1580,
  XL: 1280,
  L: 1080,
  M: 780,
  MS: 580,
  S: 380
};

function mediaCheck(size) {
  return document.body.clientWidth > this.screen[size];
}

function media(size) {
  return `screen and (max-width: ${this.screen[size]}px)`;
}
```

#### Hola

![](http://qn.canisminor.cc/2018-08-27-cm-7.png)![](http://qn.canisminor.cc/2018-08-27-cm-8.png)![](http://qn.canisminor.cc/2018-08-27-cm-9.png)

#### Resume

![](http://qn.canisminor.cc/2018-08-27-cm-10.png)![](http://qn.canisminor.cc/2018-08-27-cm-10-2.png)

设计这几个页面的时候，想起刚好家里有一台闲置的 XBox kniect，得益于红外测距功能和公开的 SDK，可以拿来做一些简单的 3D 扫描建模工作，经过 C4D 的后期修正，能够得到一个精度还算可以的头部建模。

![](http://qn.canisminor.cc/2018-08-27-cm-13.png)![](http://qn.canisminor.cc/2018-08-27-cm-12.png)

#### Blog

![](http://qn.canisminor.cc/2018-08-27-cm-14.png)

#### Projects

![](http://qn.canisminor.cc/2018-08-27-cm-15.png)

#### Contact

![](http://qn.canisminor.cc/2018-08-27-cm-16.png)

## Links

**Github Repo: ** <https://github.com/canisminor1990/canisminor>
