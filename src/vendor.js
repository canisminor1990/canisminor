import _ from 'lodash';

const react = ['react', 'react-dom'];

const dva = ['dva', 'dva/router', 'dva/fetch', 'dva/dynamic', 'dva-loading'];

const components = ['react-typist', 'react-scroll', 'react-lifecycles-compat'];

const markdown = [
  'react-markdown',
  'prismjs',
  'prismjs/components/prism-bash',
  'prismjs/components/prism-sass',
  'prismjs/components/prism-json',
  'prismjs/components/prism-jsx',
  'prismjs/components/prism-markdown',
  'prismjs/components/prism-yaml',
  'prismjs/components/prism-nginx',
];

const style = ['styled-components', 'polished'];

const utils = ['moment', 'query-string'];

export default _.concat(react, dva, components, markdown, style, utils);
