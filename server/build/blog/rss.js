const RSS = require('rss');
const { join } = require('path');
const _ = require('lodash');
const moment = require('moment');
const marked = require('marked');
const fs = require('fs-extra');
const { minify } = require('html-minifier');
const cmlog = require('cmlog');

const SITE = 'canisminor.cc';
const pathDist = './dist';
const buildDist = ['../public', '../dist'];
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

const feed = new RSS({
  title: 'CanisMinor',
  description: '来自 CanisMinor 博客的订阅信息 - CanisMinor RSS Feed',
  site_url: 'https://' + SITE,
  feed_url: 'https://' + join(SITE, 'rss.xml'),
  image_url: 'https://' + join(SITE, 'favicons/favicon-32x32.png'),
  managingEditor: 'CanisMinor',
  webMaster: 'CanisMinor',
  copyright: 'CanisMinor 2018 版权所有',
  language: 'zh-cn',
  categories: ['design', 'coding', 'ued', 'fe', 'ui/ux'],
});

const miniConf = { removeComments: true, collapseWhitespace: true };

module.exports = cb => {
  const Toc = JSON.parse(fs.readFileSync(join(pathDist, 'toc.json')));

  _.forEach(Toc, item => {
    const Page = JSON.parse(fs.readFileSync(join(pathDist, item.filename + '.json')));
    feed.item({
      title: item.title,
      description: minify(marked(Page.body), miniConf) + '...',
      url: `https://${join(SITE, 'blog', 'posts', item.filename)}?source=feed`,
      author: 'CanisMinor',
      date: moment(item.filename.split(/_/g)[0], 'YYYYMMDD').format(),
    });
  });
  try {
    fs.writeFileSync(join(buildDist[0], 'rss.xml'), feed.xml());
    cmlog.success(join(buildDist[0], 'rss.xml'));
    fs.writeFileSync(join(buildDist[1], 'rss.xml'), feed.xml());
    cmlog.success(join(buildDist[1], 'rss.xml'));
  } catch (e) {}
  cmlog.split();
  cb();
};
