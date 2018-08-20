const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const cmlog = require('cmlog');
const pathSrc = '../markdown';

module.exports = cb => {
  const files = fs.readdirSync(pathSrc);
  files.forEach(item => {
    if (item.split('_').length < 2) {
      const newName = `${moment().format('YYYYMMDD')}_${item}`;
      fs.renameSync(path.join(pathSrc, item), path.join(pathSrc, newName));
      cmlog.warn(item, '=>', newName);
    }
  });
  cmlog.split();
  cb();
};
