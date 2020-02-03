const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');
const del = require('del');
const fs = require('fs-extra');

/// /////////////////////////////////////////////
// clean
/// /////////////////////////////////////////////

gulp.task('del', () => {
  try {
    fs.mkdirSync('./dist');
  } catch (e) {}
  return del.sync(['dist/**/*'], ['dist/projects/**/*']);
});

/// /////////////////////////////////////////////
// database
/// /////////////////////////////////////////////

const buildDatabase = require('./build/database');
gulp.task('build:db', buildDatabase);

/// /////////////////////////////////////////////
// blog
/// /////////////////////////////////////////////

const buildBlog = require('./build/blog/build');
const buildBlogToc = require('./build/blog/toc');
const buildBlogRss = require('./build/blog/rss');
const addHash = require('./build/blog/timestamp');

gulp.task('add:hash', addHash);

gulp.task('build:post', buildBlog);

gulp.task('build:blog', cb => {
  return runSequence(['del', 'add:hash', 'build:post']);
});

gulp.task('build:toc', buildBlogToc);

gulp.task('build:rss', buildBlogRss);
