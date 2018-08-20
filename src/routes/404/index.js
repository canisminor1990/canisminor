import { Component } from 'react';
import styled, { css } from 'styled-components';
import { Style, TitleDecoration, Typist, View, Motion, MusicSwitch } from '../../components';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////
const WelcomeView = styled(View)`
  height: 100vh;
  overflow: hidden;
  padding: 0 22vw;
  @media ${Style.media('XXL')} {
    padding: 0 18vw;
  }
  @media ${Style.media('XL')} {
    padding: 0 14vw;
  }
  @media ${Style.media('M')} {
    padding: 0 6rem;
  }
  @media ${Style.media('S')} {
    padding: 0 3rem;
  }
`;

const Inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 4vw;
  i {
    font-size: 12rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.2;
    transition: font-size 0.3s ease;
    transition: all 0.5s ${Style.ease.normal};
    &:hover {
      color: transparent;
      -webkit-text-stroke: 0.5px #222;
    }
  }
  .Typist {
    font-size: 1.5rem;
    line-height: 1.5 !important;
    text-align: center;
    transition: font-size 0.3s ease;
  }
  @media ${Style.media('XXL')} {
    i {
      font-size: 12vw;
    }
  }
  @media ${Style.media('XL')} {
    i {
      font-size: 14vw;
    }
    .Typist {
      font-size: 1.3rem;
    }
  }
  @media ${Style.media('L')} {
    i {
      font-size: 16vw;
    }
    .Typist {
      font-size: 1.1rem;
    }
  }
  @media ${Style.media('M')} {
    left: 0;
    i {
      font-size: 20vw;
    }
    .Typist {
      font-size: 0.9rem;
    }
  }
  @media ${Style.media('S')} {
    i {
      font-size: 6rem;
    }
    .Typist {
      font-size: 0.6rem;
    }
  }
`;

const Decoration = styled(TitleDecoration)`
  position: absolute;
  left: -1rem;
  top: -2rem;
  @media ${Style.media('M')} {
    left: 0;
  }
`;

const Banner = styled.div`
  width: 40rem;
  position: absolute;
  transition: all 0.4s ease;
  top: calc((100% - 40rem) / 2);
  right: -4vw;
  @media ${Style.media('XXL')} {
    width: 38rem;
    top: calc((100% - 38rem) / 2);
  }
  @media ${Style.media('XL')} {
    width: 35rem;
    top: calc((100% - 35rem) / 2);
  }
  @media ${Style.media('L')} {
    width: 32rem;
    top: calc((100% - 32rem) / 2);
    left: 30vw;
  }
  @media ${Style.media('S')} {
    left: 30vw;
  }
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.4s ease;
`;

const ImgFront = Img.extend`
  animation: ${Style.animation.floatFront} 30s ease-in-out 0.5s infinite normal;
`;

const ImgBack = Img.extend`
  animation: ${Style.animation.floatBack} 40s ease-in-out 2s infinite normal;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class NotFound extends Component {
  state = {
    toc: [
      { title: 'Intro', to: 'welcome' },
      { title: 'Test1', to: 'test1' },
      { title: 'Test2', to: 'test2' },
    ],
  };

  componentDidMount() {
    setTitle('404');
  }

  render() {
    return [
      <MusicSwitch key="switch" />,
      <WelcomeView key="404" css={Inner} type="bottom" delay={400} duration={2000}>
        <Banner>
          <Motion mode="one" type="top" duration={1000}>
            <ImgBack id="bg" src="/img/404-banner-2.png" />
          </Motion>
          <Motion mode="one" type="bottom" duration={1000}>
            <ImgFront src="/img/404-banner-1.png" />
          </Motion>
        </Banner>
        <Title key="title">
          <Decoration key="decoration" content={['you', 'lost']} />
          <i>404</i>
          <Typist>Oops, page not found</Typist>
        </Title>
      </WelcomeView>,
    ];
  }
}

export default NotFound;
