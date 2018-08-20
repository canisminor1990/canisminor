const frontMatter = require('front-matter');
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const moment = require('moment');
const cmlog = require('cmlog');
const pathSrc = '../markdown';
const pathDist = './dist';

module.exports = cb => {
  const files = fs.readdirSync(pathSrc);
  files.forEach(item => {
    if (item.indexOf('.md') === -1) return;
    const data = fs.readFileSync(path.join(pathSrc, item), 'utf-8');
    const parsed = frontMatter(data);
    const json = { ...parsed.attributes };
    _.defaults(json, {
      tag: '',
      desc: '',
      l: '',
      m: false,
      s: false,
    });
    json.filename = item.replace('.md', '');
    json.body = parsed.body.replace(/^`````([\w:]+)$/gm, '`````$1-').replace(/(\n){3,}/g, '\n\n');
    json.body = json.body.replace(/(#(.*))\n/, (m, m1) => {
      json.title = m1.replace('#', '').replace(/^ /, '');
      json.date = moment(json.filename.split('_')[0], 'YYYYMMDD').format('YYYY-MM-DD');
      return m.replace(m1, '');
    });
    fs.writeFileSync(
      path.join(pathDist, item.replace('.md', '.json')),
      JSON.stringify(
        {
          filename: json.filename,
          title: json.title,
          tag: json.tag,
          desc: json.desc,
          cover: {
            s: json.s,
            m: json.m,
            l: json.l,
          },
          body: json.body,
          date: json.date,
        },
        null,
        2
      )
    );
    cmlog.success(item);
  });
  cmlog.split();
  cb();
};
