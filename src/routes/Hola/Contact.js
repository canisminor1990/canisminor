import styled, { css } from 'styled-components';
import { Style, Button, View, Motion } from '../../components';
import { Component } from 'react';
import { Link } from 'dva/router';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const ContactView = styled(View)`
  background: #222;
  padding: 6rem 0;
  overflow: hidden;
`;

const Inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const Title = styled.div`
  font-weight: 600;
  color: transparent;
  -webkit-text-stroke: 1px #fff;
  ${Style.fontSize(6)}
  @media ${Style.media('S')} {
    ${Style.fontSize(5)}
  }
`;

const Desc = styled.div`
  padding: 2rem 0;
  letter-spacing: 0.06em;
`;

const Doodle = `
  :doodle {
    z-index: -1;
    size: 100vmax;
    position: absolute;
    top: 0;
    left: 0;
    opacity: .1;
  }
  border-radius: 24%;
  border: 1px solid ${Style.color.goldDark};
  transition: 0.2s ease @rand(500ms);
  transform: rotate(@pick(60deg, -60deg)) scale(1.2);
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  render() {
    return (
      <Motion mode="lazyScroll">
        <ContactView key="contact" css={Inner}>
          <css-doodle grid="8">{Doodle}</css-doodle>
          <Title>LET'S TALK</Title>
          <Desc>I am available for freelance work 😉</Desc>
          <Link to="/contact">
            <Button type="white">contact me</Button>
          </Link>
        </ContactView>
      </Motion>
    );
  }
}
