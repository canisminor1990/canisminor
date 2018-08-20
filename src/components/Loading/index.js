import styled from 'styled-components';
import { Style } from '../index';
import PropTypes from 'prop-types';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.svg`
  width: 6rem;
  z-index: 10;
  overflow: hidden;
`;

const Path = styled.path`
  fill: none;
  stroke-miterlimit: 10;
  stroke-width: 3px;
`;

const Wave = Path.extend`
    transition: transform .5s cubic-bezier(.19,1,.22,1);
    stroke-dasharray: 0 200 500 200;
    animation: moveTheWaveAndDash 2s linear infinite;
    @keyframes moveTheWaveAndDash {
    0% {
        stroke-dashoffset: 0;
        transform: translateX(-125px)
    }

    to {
        stroke-dashoffset: -900;
        transform: translateX(-280px)
    }
`;

/// /////////////////////////////////////////////
// components
/// /////////////////////////////////////////////

const Loading = ({ height = '100%' }) => {
  return (
    <View style={{ height }}>
      <Container xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225.29 92.41">
        <Path stroke={Style.color.goldDark} d="M224.29,1 v90.41 h-223.29 v-90.41 h223.29z" />
        <Wave
          stroke={Style.color.goldDark}
          d="M0,20.21c38.71,0,38.71,52,77.42,52s38.71-52,77.42-52,38.71,52,77.42,52,38.71-52,77.42-52,38.71,52,77.42,52,38.71-52,77.42-52,38.71,52,77.43,52,38.71-52,77.42-52"
        />
      </Container>
    </View>
  );
};

Loading.propTypes = {
  height: PropTypes.string,
};

export default Loading;
