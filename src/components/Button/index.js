import styled from 'styled-components';
import { Style } from '../index';
import PropTypes from 'prop-types';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Base = styled.button`
  background: transparent;
  ${Style.fontSize(0)};
  font-weight: 500;
  padding: 1.5rem 2.5rem;
  cursor: pointer;
  position: relative;
  letter-spacing: 0.06em;
  border: 0.5px solid #eee;
  -webkit-appearance: none;
`;

const Btn = Base.extend`
  position: relative;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  &:before {
    content: '';
    height: 100%;
    width: 0;
    background: #222;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
    z-index: -1;
  }
  &:hover {
    color: white;
    border: 0.5px solid transparent;
    &:before {
      width: 100%;
    }
  }
`;

const BlackBtn = Base.extend`
  border: none;
  background: #222;
  color: #fff;
`;

const WhiteBtn = Btn.extend`
  border-color: #fff;
  color: #fff;
  &:before {
    background: #fff;
  }
  &:hover {
    color: #222;
  }
`;

/// /////////////////////////////////////////////
// components
/// /////////////////////////////////////////////

const Button = ({ type, size, children, ...other }) => {
  switch (type) {
    case 'black':
      return <BlackBtn {...other}>{children.toUpperCase()}</BlackBtn>;
    case 'white':
      return <WhiteBtn {...other}>{children.toUpperCase()}</WhiteBtn>;
    default:
      return <Btn {...other}>{children.toUpperCase()}</Btn>;
  }
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
};

export default Button;
