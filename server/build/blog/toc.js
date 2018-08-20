const fs = require('fs-extra');
const path = require('path');
const cmlog = require('cmlog');
const pathDist = './dist';

const sortNumber = (a, b) => b.split('_')[0] - a.split('_')[0];

module.exports = cb => {
  const files = fs.readdirSync(pathDist);
  let tocData = [];
  files.sort(sortNumber).forEach(item => {
    if (item !== 'toc' && item !== '.DS_Store') {
      fs.renameSync(path.join(pathDist, item), path.join(pathDist, item));
      const data = JSON.parse(fs.readFileSync(path.join(pathDist, item)));
      const { filename, title, tag, desc, cover, date } = data;
      tocData.push({
        filename,
        title,
        tag,
        desc,
        cover,
        date,
      });
    }
  });
  const buildName = path.join(pathDist, 'toc.json');
  fs.writeFileSync(buildName, JSON.stringify(tocData, null, 2));
  cmlog.success(buildName);
  cmlog.split();
  cb();
};
