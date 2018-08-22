import { Component } from 'react';
import { Header, Footer, Style, Motion, ScrollToHide } from '../../components';
import styled from 'styled-components';

/// /////////////////////////////////////////////
// config
/// /////////////////////////////////////////////

const navbarTabs = {
  hola: '/hola',
  resume: '/resume',
  blog: '/blog',
  projects: '/projects',
  contact: '/contact',
};

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const VideoCase = styled(Motion)`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Style.color.bg};
  z-index: -1;
  > video {
    height: 100%;
  }
  @media ${Style.media('M')} {
    height: ${document.body.clientHeight}px;
  }
`;

const Explorer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-family: ${Style.fontFamily.times};
  font-style: italic;
  ${Style.fontSize(-2)};
`;
const Line = styled.div`
  width: 1px;
  height: 5rem;
  background: #666;
  margin-top: 1rem;
  @media ${Style.media('M')} {
    height: 3rem;
  }
`;

const Content = styled.div`
  min-height: 100vh;
`;
/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class App extends Component {
  footer = [
    { type: 'social-wechat', href: '/contact/qrcode' },
    {
      type: 'social-linkedin',
      href: 'https://www.linkedin.com/in/canisminor/',
    },
    { type: 'social-github', href: 'https://github.com/canisminor1990' },
    { type: 'social-rss', href: 'https://canisminor.cc/rss.xml' },
    { type: 'social-mail', href: 'mailto:i@canisminor.cc' },
  ];
  Video = () =>
    location.pathname === navbarTabs.hola ? (
      <ScrollToHide maxOffset={1000}>
        <VideoCase mode="one" type="alpha" duration={1000}>
          <video
            id="video"
            muted
            loop
            playsInline
            webkit-playsinline
            x5-playsinline
            x-webkit-airplay="allow"
            autoPlay
            poster="http://qn-video.canisminor.cc/home.png"
            onCanPlay={this.Play}
          >
            <source src="http://qn-video.canisminor.cc/home.mp4" type="video/mp4" />
          </video>
          <Explorer key="explorer">
            <div>Scroll to Explorer</div>
            <Line />
          </Explorer>
        </VideoCase>
      </ScrollToHide>
    ) : null;

  Play = () => {
    document.getElementById('video').play();
  };

  render() {
    if (location.pathname === '/') return this.props.children;
    return (
      <div>
        <Header tabs={navbarTabs} />
        <this.Video />
        <audio id="music" src="http://qn-video.canisminor.cc/music.mp3" loop />
        <section>
          <Content>{this.props.children}</Content>
          <Footer key="footer" data={this.footer} />
        </section>
      </div>
    );
  }
}

export default App;
