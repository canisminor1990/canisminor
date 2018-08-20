const addTag = require('./addTag');
const filters = require('./filters');
const tags = require('./tags');

module.exports = env => {
  for (let name in filters) {
    env.addFilter(name, filters[name]);
  }
  for (let name in tags) {
    addTag(env, name, tags[name], { ends: true });
  }
  env.opts.autoescape = false;
};
