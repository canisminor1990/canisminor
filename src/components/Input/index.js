import styled, { css } from 'styled-components';
import { Style } from '../index';
import PropTypes from 'prop-types';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Base = css`
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  border: 1px solid #eee;
  padding: 1.5rem;
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  flex: 1;
  box-shadow: none;
  border-radius: 0;
  -webkit-appearance: none;
  &:focus {
    border-color: ${Style.color.goldDark};
  }
`;

const I = styled.input`
  ${Base};
`;

const Textarea = styled.textarea`
  ${Base};
  min-height: 8rem;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const Input = ({ type = 'text', placeholder = '', textarea, ...other }) => {
  return textarea ? (
    <Textarea placeholder={placeholder} {...other} />
  ) : (
    <I type="text" placeholder={placeholder} {...other} />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
};

export default Input;
