---
tag: tech
desc: React & Lowdb 实现 Screeps 可视化 BDP 个人数据平台
s: http://qn.canisminor.cc/2018-08-18-screeps-dashboards-s.png
l: http://qn.canisminor.cc/2018-08-18-screeps-dashboards-l.png
---

# Screeps Dashboard

![auto](https://img.shields.io/badge/Dashboard%20for-Screeps-brightgreen.svg)

👀 Dashboard for [screeps.com](https://screeps.com/), view [online demo](http://screeps.canisminor.cc/).

> #### What is Screeps?
>
> Screeps means “scripting creeps.” It’s an open-source sandbox MMO RTS game for programmers, wherein the core mechanic is programming your units’ AI. You control your colony by writing JavaScript which operate 24/7 in the single persistent real-time world filled by other players on par with you.

![](http://qn.canisminor.cc/2018-08-18-054310.png)

自从去年孤军奋战两个月被侵略型 Alliance 打爆后就歇了 🤒，最近看了官方的更新，新加了一些好玩特性，把图形引擎从 SVG 换成了 WebGL，并引入了 shard 概念，新区每 tick 稳定在 3s 左右(基本比老区快了将近 1 倍)，就决定回坑开新局。拿 Typescript 完整重写了状态机和 creep 逻辑，并美化了 console 的数据输出（ as a designer ）, 其中发现一个痛点官方并没有提供一个令人满意 Dashboard，每天需要花大量时间遍历自己的 Room 观察发展状态，也没有便捷的查询自己交易和传输记录的地方，那就自己动手丰衣足食吧 🙌。

官方给出了 Memory 的接口，可以定时从 Memory 中拉取数据，使自建 Dashboard 成为可能，服务端的选择为 `Express` + `lowdb` ，客户端依然是最常用的 React 全家桶 `Dva` + `Roadog` 。过程中还发现一个有趣的项目 [Screeps-SVG](https://github.com/Spedwards/Screeps-SVG) (Creates SVG Elements for game objects that can be logged to console)，可以通过单位实时数据绘制当前单位动态图像，但因为是为 console 设计的所以不能直接使用，于是花了点时间改写成了 React 独立组件。

## Preview

![](https://raw.githubusercontent.com/canisminor1990/screeps-dashboard/master/preview.png)

目前实现的功能有：

- 全局 GCL 及升级时间预估，Credits，Power
- 市场买卖记录， 房间间传输记录
- 房间 RCL 及升级时间预估
- 房间 Storage，储存详细，及容量预警
- 房间 Termianl，储存详细，及容量预警
- 房间 Spawn 队列，Creep 图鉴与详情（含 Postion，Parts，Carry）
- 房间传输历史记录
- 房间 Lab 的 Order 与 Offer 及当前状态
- 并适配了移动端现实

![](https://raw.githubusercontent.com/canisminor1990/screeps-dashboard/master/preview-mobile.png)

## Usage

```bash
# start server
$ yarn start:servar

# dev webview
$ yarn start

# build webview
$ yarn build
```

服务器配置文件：`./server/config.example.json` => `./server/config.json`

```json
{
  "token": "screeps token",
  "grafana": "(option) screepspl grafana token",
  "shard": ["shard2"]
}
```

## Appendix

我当前的位置为 [Sharp3 E13N12](https://screeps.com/a/#!/profile/CanisMinor) , ScreepAI [项目地址](https://github.com/ScreepsAI/screeps)， 欢迎做邻居 😉

![](http://qn.canisminor.cc/2018-08-18-screeps-1.png)

## Link

- **Github Repo：**<https://github.com/canisminor1990/screeps-dashboard>
- **Oneline Demo: ** <http://screeps.canisminor.cc>
- **Official: ** <https://screeps.com>
- **Official Doc: ** <http://docs.screeps.com/>
- **Official API: ** <http://docs.screeps.com/api/>
