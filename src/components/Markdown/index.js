import ReactMarkdown from 'react-markdown';
import { Style, Image } from '../index';
import Prism from './prism';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled(ReactMarkdown)`
  width: 100%;
  > * {
    margin-bottom: 3rem;
  }
  a {
    color: #4a90e2;
  }
  img {
    max-width: 100%;
    width: auto;
  }
  p {
    ${Style.fontSize(0, true)};
    text-align: justify;
  }
  blockquote {
    margin-left: 0;
    padding-left: 1rem;
    border-left: 0.25rem solid #e3e3e3;
    color: #999;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 500;
  }
  h1 {
    margin-top: 6rem;
    margin-bottom: 2rem;
    ${Style.fontSize(4, true)};
  }
  h2 {
    margin-top: 6rem;
    margin-bottom: 2rem;
    ${Style.fontSize(3, true)} &:after {
      content: '#';
      display: inline-block;
      mix-blend-mode: multiply;
      color: #e3e3e3;
      margin-left: 0.5rem;
      transition: all 0.5s ease;
    }
  }
  h3 {
    margin-top: 4rem;
    margin-bottom: 1rem;
    ${Style.fontSize(2, true)};
  }
  h4,
  h5,
  h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    ${Style.fontSize(1, true)};
  }
  pre {
    background: #f8f8f8;
    padding: 1rem;
  }
  code {
    font-family: ${Style.fontFamily.code};
    ${Style.fontSize(-2, true)};
  }
  ul {
    list-style: none;
    padding: 0;
    padding-left: 0.25rem;
  }
  li {
    padding-left: 1.5rem;
    line-height: 1.8;
    &:before {
      content: '◆';
      font-size: 0.5em;
      margin-left: -1.5rem;
      margin-top: 0.3rem;
      color: #bbb;
      position: absolute;
    }

    & + li {
      margin-top: 0.5rem;
    }

    &:hover {
      &:before {
        color: ${Style.color.goldDark};
      }
    }

    > p {
      display: inline;
    }
  }
  table {
    border: 2px solid #eee;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }
  thead {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
    color: #333;
  }
  th {
    font-weight: 600;
  }
  th,
  td {
    border: 0.5px solid #f8f8f8;
    padding: 1rem;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const renderer = {
  image: e => {
    if (_.includes(e.alt, 'px')) {
      return <Image src={e.src} style={{ maxWidth: e.alt }} grey />;
    } else if (_.includes(e.alt, 'rem')) {
      return <Image src={e.src} style={{ maxWidth: e.alt }} grey />;
    } else if (_.includes(e.alt, '%')) {
      return <Image src={e.src} style={{ maxWidth: e.alt }} grey />;
    } else if (e.alt === 'video') {
      return (
        <video controls playsinline style={{ maxWidth: '100%' }}>
          <source src={e.src} type="video/mp4" />
        </video>
      );
    } else {
      return <Image src={e.src} alt={e.alt} grey />;
    }
  },
  code: e => <Prism value={e.value} language={e.language} />,
};

const Markdown = ({ content = '' }) => <View source={content} renderers={renderer} />;

Markdown.propTypes = {
  content: PropTypes.string,
};

export default Markdown;
