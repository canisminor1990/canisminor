import ReactTypist from 'react-typist';
import styled, { keyframes } from 'styled-components';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Blink = keyframes`
0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const View = styled(ReactTypist)`
  .Cursor--blinking {
    animation: ${Blink} 1s ease-in-out infinite;
    color: #aaa;
    opacity: 1;
  }
`;

const Typist = ({ children, ...other }) => {
  const cursor = {
    show: true,
    blink: true,
    element: '_',
    hideWhenDone: false,
  };

  return (
    <View avgTypingDelay={20} cursor={cursor} {...other}>
      {children}
    </View>
  );
};

export default Typist;
