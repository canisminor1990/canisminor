import { View, MusicSwitch, Image } from '../../components';
import styled, { css } from 'styled-components';
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
`;
const Qrcode = styled.div`
  width: 15rem;
  height: 15rem;
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
    </View>,
  ];
};
