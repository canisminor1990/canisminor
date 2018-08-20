import { Link } from 'dva/router';
import { Typist, Logo, Icon, View, Style } from '../../components';
import styled from 'styled-components';
import setTitle from '../../utils/setTitle';

const Content = styled(Link)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Desc = styled(Typist)`
  text-align: center;
  ${Style.fontSize(-1, true)};
`;

export default () => {
  setTitle('Welcome');

  const toIndex = () => {
    location.href = '/hola';
  };

  return (
    <View mode="one" type="bottom">
      <Content to="/hola">
        <Logo size={3} />
        <Icon type="logo-text-combine" size={2} style={{ margin: '.5rem 0 4rem' }} />
        <Desc onTypingDone={() => setTimeout(toIndex, 2000)}>
          <span />
          Collection of my designs, articles and
          <br />
          open-source programs
        </Desc>
      </Content>
    </View>
  );
};
