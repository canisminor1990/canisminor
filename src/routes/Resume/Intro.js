import styled, { css } from 'styled-components';
import { Icon, Style, TitleDecoration, Typist, View, Motion } from '../../components';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////
const IntroView = styled(View)`
  height: 100vh;
  overflow: hidden;
  background: #fff;
  @media ${Style.media('XXL')} {
    padding: 6rem;
  }
  @media ${Style.media('XL')} {
    padding: 6rem;
    padding-right: 2rem;
  }
  @media ${Style.media('L')} {
    padding: 4rem;
  }
  @media ${Style.media('M')} {
    padding: 3rem;
  }
  @media ${Style.media('S')} {
    padding: 1.5rem;
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
  left: 0;
  i {
    font-size: 6rem;
    line-height: 1.5;
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
      font-size: 6vw;
    }
  }
  @media ${Style.media('XL')} {
    i {
      font-size: 6vw;
    }
    .Typist {
      font-size: 1.3rem;
    }
  }
  @media ${Style.media('L')} {
    i {
      font-size: 7vw;
    }
    .Typist {
      font-size: 1.1rem;
    }
  }
  @media ${Style.media('M')} {
    .Typist {
      font-size: 0.9rem;
    }
  }
  @media ${Style.media('MS')} {
    i {
      font-size: 8vw;
    }
  }
  @media ${Style.media('S')} {
    i {
      font-size: 2.2rem;
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
  right: 0;
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
    left: 45vw;
  }

  @media ${Style.media('M')} {
    left: 40vw;
    #bg {
      left: 2rem;
    }
  }
  @media ${Style.media('MS')} {
    left: 39vw;
    #bg {
      left: 6rem;
    }
  }
  @media ${Style.media('S')} {
    left: 38vw;
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

export default () => {
  return (
    <IntroView css={Inner} type="bottom" delay={400} duration={2000}>
      <Banner>
        <Motion mode="one" type="top" duration={1000}>
          <ImgBack id="bg" src="/img/resume-banner-2.png" />
        </Motion>
        <Motion mode="one" type="bottom" duration={1000}>
          <ImgFront src="/img/resume-banner-1.png" />
        </Motion>
      </Banner>
      <Title key="title">
        <Decoration key="decoration" content={['I', 'am']} />
        <Icon type="logo-text" />
        <Typist>UI / UX Designer & FE Developer</Typist>
      </Title>
    </IntroView>
  );
};
