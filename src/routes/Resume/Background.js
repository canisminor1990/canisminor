import styled from 'styled-components';
import { Style } from '../../components';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;
const Text = styled.div`
  font-size: 14rem;
  position: absolute;
  font-weight: 600;
  color: #fff;
  text-shadow: 0.5vw 2vh 2rem rgba(0, 0, 0, 0.04);
  @media ${Style.media('M')} {
    font-size: 30vw;
  }
`;

const C = Text.extend`
  top: 10%;
  left: 10%;
`;

const A = Text.extend`
  top: 40%;
  left: 24%;
`;

const N = Text.extend`
  top: 70%;
  left: 45%;
`;

const I = Text.extend`
  left: 65%;
`;

const S = Text.extend`
  bottom: -10%;
  right: 10%;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default () => {
  return (
    <Background>
      <C>C</C>
      <A>A</A>
      <N>N</N>
      <I>I</I>
      <S>S</S>
    </Background>
  );
};
