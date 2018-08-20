const fs = require('fs');
const path = require('path');
const Data = require('../../database');
const cmlog = require('cmlog');

module.exports = cb => {
  fs.writeFileSync(path.resolve('./db.json'), JSON.stringify(Data));
  cmlog.success('db.json');
  cb();
};
