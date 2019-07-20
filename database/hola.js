const Year = new Date().getFullYear();
const article = [
  {
    "filename": "20180820_canisminor",
    "title": "CanisMinor",
    "tag": "design",
    "desc": "Design & development records of personal site",
    "cover": {
      "s": "http://qn.canisminor.cc/2018-08-27-canisminor-s.png",
      "m": false,
      "l": "http://qn.canisminor.cc/2018-08-27-canisminor-l.png"
    },
    "date": "2018-08-20"
  },
  {
    "filename": "20180710_panda",
    "title": "熊猫金库项目梳理",
    "tag": "research",
    "desc": "创业历程与技术总结",
    "cover": {
      "s": false,
      "m": false,
      "l": "http://qn.canisminor.cc/2018-08-24-panda-l.png"
    },
    "date": "2018-07-10"
  },{
    "filename": "20180308_sketchplugin",
    "title": "Skpm 插件开发",
    "tag": "tech",
    "desc": "Sketch 插件开发 - skpm & webview",
    "cover": {
      "s": false,
      "m": false,
      "l": "http://qn.canisminor.cc/2018-08-18-skpm.png"
    },
    "date": "2018-03-08"
  }, {
    "filename": "20180502_screepsdashboard",
    "title": "Screeps Dashboard",
    "tag": "tech",
    "desc": "React & Lowdb 实现 Screeps 可视化 BDP 个人数据平台",
    "cover": {
      "s": "http://qn.canisminor.cc/2018-08-18-screeps-dashboards-s.png",
      "m": false,
      "l": "http://qn.canisminor.cc/2018-08-18-screeps-dashboards-l.png"
    },
    "date": "2018-05-02"
  },{
    "filename": "20160224_pandaborn",
    "title": "二发熊诞生记",
    "tag": "design",
    "desc": "Character Design",
    "cover": {
      "s": false,
      "m": false,
      "l": "http://qn.canisminor.cc/2018-08-22-born-l.png"
    },
    "date": "2016-02-24"
  },
];

try {
  const Toc = require('../server/dist/toc');
  article.unshift(Toc[0])
} catch (e) {}


module.exports = {
  intro  : {
    skills: [
      { icon: "/img/vd-skill-interface.png", title: "UI/UX Design" },
      { icon: "/img/vd-skill-brand.png", title: "Branding Design" },
      { icon: "/img/vd-skill-manage.png", title: "Design Management" },
      { icon: "/img/fe-skill-web.png", title: "Web Frontend Development" },
      { icon: "/img/fe-skill-react.png", title: "React UI Library Development" },
      { icon: "/img/fe-skill-sketch.png", title: "Sketch Plugin Development" }
    ],
    title : `Hello, I'm CanisMinor,|Alipay UX Designer &|Front-end Developer based|in Hangzhou, I create digital|products a more sexy and|usable place.`,
    desc  : [
      `My name is Yufan Yang a.k.a CanisMinor,|${Year - 1990} years old with ${Year -
                                                                               2012} years design experience.|I graduated at China Academy of Art with a degree in Visual Communication Design where I discovered my passion for problem solving declined to user experience design.|I am currently working as a ued director with knowledge abt design management and agile app development process.`,
      `I familiar with major front-end technology stack like react / vue and Alibaba's open-sourceprojects like antd / dva / umi. |I develop some Sketch plugins like Sketch Selectand Name as a third-party developer.|I am crazy about screeps, pet ants, cat and thirsty for new knowledge, experience and creating sexy things. If you need help of yourproject, feel free to contact me.`
    ]
  },
  design : [
    {
      cover: "http://qn.canisminor.cc/project-instantzine.png",
      title: "须臾映社 Instant-Zine",
      type : "typography / photography",
      to   : "/projects/instant-zine"
    }, {
      cover: "http://qn.canisminor.cc/2018-08-18-project-panda.png",
      title: "熊猫金库 3.0",
      type : "ui design / mobile app",
      to   : "/blog/posts/20180101_panda"
    }, {
      cover: "http://qn.canisminor.cc/2018-08-22-project-3dpanda.png",
      title: "3D二发熊角色设定",
      type : "3d character design",
      to   : "/blog/posts/20171201_3dpanda"
    }, {
      cover: "http://qn.canisminor.cc/2018-08-18-project-quanda.png",
      title: "Quanda ICO",
      type : "brand design / ui design",
      to   : "/blog/posts/20180212_quanda"
    }, {
      cover: "http://qn.canisminor.cc/2018-08-18-project-hujiang.png",
      title: "沪江学习 Hujiang",
      type : "ui design / mobile app",
      to   : "/blog/posts/20151101_hujiang"
    }, {
      cover: "http://qn.canisminor.cc/2018-08-21-project-cc.png",
      title: "开心词场 Hujiang",
      type : "ui design / mobile app",
      to   : "/blog/posts/20150122_cichang"
    }
  ],
  coding : [
    {
      cover: "/img/coding-anto.png",
      title: "anto",
      desc : "🔵 Sketch Tools for AFUX",
      type : "sketch plugin",
      href : "https://github.com/canisminor1990/anto"
    },
    {
      cover: "/img/coding-name.png",
      title: "sketch-name-organizer",
      desc :
        "🖌 Rename and sort artboards based on their x and y position; Rename layers based on their Style and Symbol.",
      type : "sketch plugin",
      href : "https://github.com/canisminor1990/sketch-name-organizer"
    },
    {
      cover: "/img/coding-pand.png",
      title: "panda-design",
      desc : "🐼 Panda Design React UI Components",
      type : "react ui-kit",
      href : "https://github.com/PandaUED/panda-design"
    },
    {
      cover: "/img/coding-anto.png",
      title: "anto-diff",
      desc : "🔵 Sketch diff tool",
      type : "electron",
      href : "https://github.com/canisminor1990/anto-diff"
    },
    {
      cover: "/img/coding-bilibili.png",
      title: "bilibili-client",
      desc : "📺 Bilibili Mini-Client # Mac/Win",
      type : "electron",
      href : "https://github.com/canisminor1990/bilibili-client"
    },
    {
      cover: "/img/coding-ffxiv.png",
      title: "ffxiv-cmskin",
      desc : "🌱 CanisMinor ActSkin - FFXIV",
      type : "final fantasy xiv",
      href : "https://github.com/canisminor1990/ffxiv-cmskin"
    }
  ],
  article
};
