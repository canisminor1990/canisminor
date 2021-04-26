const post = {
  id   : "example",
  cover: {
    wide  : "https://cdn-isux.qq.com/upload/covers/192_b_src.jpg",
    square: "https://cdn-isux.qq.com/upload/covers/187_a_src.jpg"
  },
  title: "山田土 : 茶与创意之美",
  tag  : "design",
  desc : "山田土是一个生活品牌，2014年创立于深圳。以茶为载体、以崭新的美学追求实践有生命力的创意。从茶品、茶器到生活物品，努力探求生活与美的种种可能。"
};

const example = {
  id   : "example",
  date : new Date(),
  contributors: [ "CanisMinor", "Wang"],
  cover: {
    full  : "https://cdn-isux.qq.com/upload/detail/71zjl1ZGoQbKnpyMGHca5Eu33m9aSIfl2NNmgFxUO62.png",
    wide  : "https://cdn-isux.qq.com/upload/covers/192_b_src.jpg",
    square: "https://cdn-isux.qq.com/upload/covers/187_a_src.jpg"
  },
  title: "WebHook 图形化部署器",
  desc : "山田土是一个生活品牌，2014年创立于深圳。以茶为载体、以崭新的美学追求实践有生命力的创意。从茶品、茶器到生活物品，努力探求生活与美的种种可能。",
  tag  : "design",
  body : "\n\n\n因为有时候 webhook 会莫名其妙部署失败，也不知道哪里出了问题，只能 ssh 到服务器查看 log，所以写了一个带图形界面服务端 WebHook 部署器，可以直接在网页上查看部署命令和执行结果。[GitHub 地址](https://github.com/canisminor1990/webhook)\n\n> 支持: **Github / Coding**\n\n## Demo\n\n可以访问此网站查看 **[Demo](http://hook.canisminor.cc/)**\n\n![center](https://oss.canisminor.cc/2017-09-25-Group.png)\n\n## Usage\n\n**克隆项目：**\n\n```bash\n$ git clone git@github.com:canisminor1990/webhook.git\n```\n\n**在 `./config.js` 中设置你的项目：**\n\n> 在 nginx 设置 wehbook 接收地址，并为你的项目添加 webhook\n\n```js\nconst projects = {\n\texample: { // location pathname -> http://hook.xxxx.xxx/example\n\t\ttype   : 'github',  // github || coding\n\t\tmessage: false, // false || commit message\n\t\tbranch : 'master', // allowed branch\n\t\tdir    : '~/example/', // cd repo path on server\n\t\tbash   : ['git pull', 'yarn build'] // bash command to run\n\t},\n\t...\n}\n\nmodule.exports = {\n\tport     : 8888, // port to listen\n\tmaxLength: 50, // max messages to store\n\tlogPath  : 'log.json', // log path\n\tcommandConnect: '&&', // fish shell change this to \";\"\n\tprojects : projects\n};\n```\n\n**安装设置并启动：**\n\n```bash\n$ npm i -g forever # install forever\n\n$ yarn # install package\n\n$ yarn start # forever start\n```\n\n**Debug:**\n\n```bash\n$ node index.js # debug with log\n```\n"
};

const res = {
  cover: "https://isux.tencent.com/static/upload/pics/brands/-QQ@2x.png",
  title: "Test",
  src: "https://canisminor.cc",
}

export default {
  "/api/posts/example": example,
  "/api/blog/1"   : {
    page : 1,
    more : true,
    posts: [post, post, post, post, post, post, post]
  },
  "/api/blog/2"   : {
    page : 2,
    more : false,
    posts: [post, post, post, post, post, post]
  },
  "/api/search" : [
    {
      title: "山田土 : 茶与创意之美",
      tag  : "design",
      id   : "example",
    },
    {
      title: "测试测试",
      tag  : "tech",
      id   : "example",
    }
  ],
  "/api/projects" : [
    res,res,res,res,res,res,res
  ]
};