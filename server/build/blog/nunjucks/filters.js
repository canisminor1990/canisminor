module.exports = {
  json_str: data => {
    if (data) {
      return JSON.stringify(data, null);
    }
  },
  split: (data, arg) => {
    if (data && arg) {
      return data.split(arg);
    }
  },
  path_split: data => {
    if (data) {
      return data
        .replace('.md', '')
        .replace('.html', '')
        .split('/');
    }
  },
};
