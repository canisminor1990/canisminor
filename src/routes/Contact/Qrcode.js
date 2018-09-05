import styled, { css } from 'styled-components';
import { View, MusicSwitch, Image, Style } from '../../components';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Inner = css`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${Style.media('M')} {
    flex-direction: column;
  }
`;
const Qrcode = styled.div`
  width: 15rem;
  height: 15rem;
  margin: 2rem;
  @media ${Style.media('M')} {
    width: 12rem;
    height: 12rem;
    margin: 1rem;
  }
`;
/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default () => {
  setTitle('Qrcode');
  return [
    <MusicSwitch key="switch" minWidth={0} />,
    <View key="view" css={Inner} type="bottom" mode="one">
      <Qrcode>
        <Image src="/img/qrcode.png" />
      </Qrcode>
      <Qrcode>
        <Image src="/img/wx-qrcode.png" />
      </Qrcode>
    </View>,
  ];
};
