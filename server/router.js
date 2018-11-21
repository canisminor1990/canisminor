const express = require('express');
const cmlog = require('cmlog');
const fs = require('fs');
const FileSync = require('lowdb/adapters/FileSync');
const _ = require('lodash');
const lowdb = require('lowdb');
const path = require('path');
const mailgunConfig = require('./config');
const mailgun = require('mailgun-js')(mailgunConfig);
const router = express.Router();
const fileName = path.resolve('./db.json');
const db = lowdb(new FileSync(fileName));

fs.watchFile(fileName, () => {
  db.read();
  cmlog.info('Reload database.');
});

/// /////////////////////////////////////////////
// GET
/// /////////////////////////////////////////////

router.get('(/v2)?/blog/toc', (req, res) => {
  const toc = db.get('blog.toc').value();
  let { page } = req.query;
  if (page) {
    page = parseInt(page);
    const Page = [];
    let count = 0;
    _.forEach(toc, item => {
      if (_.isUndefined(Page[count])) Page[count] = [];
      Page[count].push(item);
      const maxLength = count === 0 ? 10 : 9;
      if (Page[count].length === maxLength) count++;
    });
    res.json({
      toc: Page[page - 1],
      page: page,
      pages: Page.length,
    });
  } else {
    res.json(toc);
  }
});

router.get('(/v2)?/*', (req, res) => {
  const url = req.url
    .toString()
    .replace('/v2', '')
    .replace(/^\//, '')
    .replace(/\//g, '.');

  res.json(db.get(url).value());
});

/// /////////////////////////////////////////////
// POST
/// /////////////////////////////////////////////

router.post('(/v2)?/mail', (req, res) => {
  const { subject = '', text = '' } = req.query;
  const Data = {
    from: 'From:canisminor.cc <postmaster@mailgun.canisminor.cc>',
    to: 'i@canisminor.cc',
    subject,
    text,
  };
  mailgun.messages().send(Data, (error, body) => {
    if (error) console.error(error);
    res.json(body);
  });
});

router.post('(/v2)?/cubic-bezier', (req, res) => {
  try {
    const CubicBezier = require('./routes/CubicBezier');
    res.json(CubicBezier(req.query));
  } catch (e) {}
});

module.exports = router;
