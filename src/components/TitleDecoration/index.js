import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Style } from '../';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const First = styled.div`
  ${Style.fontSize(-2, true)};
  font-family: ${Style.fontFamily.times};
  font-style: italic;
  width: 100%;
`;

const Second = First.extend`
  text-align: right;
`;

const Line = styled.div`
  height: 1px;
  width: 6rem;
  background: ${Style.color.goldDark};
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const TitleDecoration = ({ content = ['Hi', 'there'], ...other }) => {
  return (
    <div {...other}>
      <First>{content[0]}</First>
      <Line />
      <Second>{content[1]}</Second>
    </div>
  );
};

TitleDecoration.propTypes = {
  content: PropTypes.array,
};

export default TitleDecoration;
