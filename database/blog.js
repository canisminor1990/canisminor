const Posts = {};
let Toc = [];
try {
  Toc = require('../server/dist/toc');
  Toc.forEach(item => {
    Posts[item.filename] = require(`../server/dist/${item.filename}.json`);
  });
} catch (e) {}

module.exports = {
  toc: Toc,
  posts: Posts,
};
