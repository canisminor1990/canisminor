import prism from 'prismjs';
import PropTypes from 'prop-types';
import bash from 'prismjs/components/prism-bash';
import sass from 'prismjs/components/prism-sass';
import json from 'prismjs/components/prism-json';
import jsx from 'prismjs/components/prism-jsx';
import md from 'prismjs/components/prism-markdown';
import yaml from 'prismjs/components/prism-yaml';
import nginx from 'prismjs/components/prism-nginx';
import 'prismjs/themes/prism.css';

const extensions = {
  bash,
  js: jsx,
  scss: sass,
  sass,
  json,
  md,
  yaml,
  nginx,
  html: 'markup',
  ejs: 'markup',
  svg: 'markup',
  xml: 'markup',
  py: 'python',
  rb: 'ruby',
};

const Prism = ({ value = '', language = '' }) => {
  const lang = !prism.languages.hasOwnProperty(language)
    ? extensions[language] || 'markup'
    : language;
  const __html = prism.highlight(value, prism.languages[lang]);
  return (
    <pre lang={lang}>
      <code dangerouslySetInnerHTML={{ __html }} />
    </pre>
  );
};

Prism.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string,
};

export default Prism;
