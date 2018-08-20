import styled from 'styled-components';
import _ from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';

const I = styled.i`
  font-size: ${props => props.size};
  line-height: ${props => props.size};
  min-width: ${props => props.size};
  display: inline-block;
`;

const Icon = ({ size = 1, type = '', ...other }) => {
  if (!_.isNumber(size)) {
    if (size.indexOf('px') > -1) size = rem(size);
  } else {
    size = `${size}rem`;
  }
  const className = ['cm-iconfont', `icon-${type}`].join(' ');
  return <I className={className} size={size} {...other} />;
};

Icon.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string,
  css: PropTypes.string,
};

export default Icon;
