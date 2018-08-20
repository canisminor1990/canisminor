import { connect } from 'dva/index';
import _ from 'lodash';
import { Component } from 'react';
import styled, { css } from 'styled-components';
import {
  View,
  Style,
  TitleDecoration,
  Motion,
  Header,
  MusicSwitch,
  Loading,
} from '../../components';
import Title from './Title';
import { Link } from 'dva/router';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Inner = css`
  max-width: 1024px !important;
`;

const Body = styled(Motion)`
  max-width: 1024px;
  min-height: 50vh;
  overflow: hidden;
  margin: 0 auto 4rem;
  @media ${Style.media('S')} {
    margin-top: -2rem;
  }
`;

const Item = styled(Link)`
  display: block;
  position: relative;
`;

const Cover = styled.div`
  display: block;
  width: 100%;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 10rem;
  @media ${Style.media('M')} {
    height: 8rem;
  }
  @media ${Style.media('S')} {
    height: 6rem;
    background-position: left center;
  }
`;

const Mask = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: all 0.5s ease-in-out;

  ${Item}:hover & {
    transform: translate3d(100%, 0, 0);
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Split = styled.div`
  height: 1px;
  background: #222;
  width: 4rem;
  margin-right: 3rem;
  transition: all .5s ${Style.ease.normal};
        ${Item}:hover & {
    background: #fff;
    width: 9rem;
    margin-right: 1.5rem;
  }
        @media ${Style.media('M')} {
       width: 2rem;
            ${Item}:hover & {
    width: 5rem;
  }
  
      @media ${Style.media('S')} {
       width: 1rem;
            ${Item}:hover & {
    width: 3rem;
  }
  }
`;

const Number = styled.div`
  position: absolute;
  z-index: 0;
  left: 5rem;
  transition: all 0.5s ${Style.ease.normal};
  ${Item}:hover & {
    color: rgba(255, 255, 255, 0);
  }
  @media ${Style.media('M')} {
    font-size: 0.8rem;
    left: 3rem;
  }
  @media ${Style.media('S')} {
    left: 2rem;
  }
`;

const ProjectTitle = styled.div`
  font-weight: 600;
  transition: all 0.5s ${Style.ease.normal};
  ${Style.fontSize(2, true)} ${Item}:hover & {
    color: #fff;
  }

  @media ${Style.media('M')} {
    ${Style.fontSize(1, true)};
  }
`;

const ProjectDesc = styled.div`
  ${Style.fontSize(-2, true)};
  transition: all 0.5s ${Style.ease.normal};
  letter-spacing: 0.06em;
  ${Item}:hover & {
    color: #fff;
  }
`;

const Button = styled.div`
  letter-spacing: 0.06em;
  ${Style.fontSize(-2, true)};
  font-weight: 500;
  height: 4rem;
  width: 12rem;
  padding: 1.5rem 0 0 1.4rem;
  transition: all 0.5s ${Style.ease.normal};
  background-image: url(/img/projects-btn-normal.png);
  background-size: 100%;
  margin-top: 2rem;
  @media ${Style.media('MS')} {
    display: none;
  }
  ${Item}:hover & {
    color: #fff;
    background-color: #222;
    background-image: url(/img/projects-btn-active.png);
  }
`;

const TitleView = styled(Motion)`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
  border-top: 0.5px solid #eee;
  padding: 6rem 0;
`;

const ExtraTitle = styled.div`
  font-weight: 600;
  color: transparent;
  -webkit-text-stroke: 1px #222;
  ${Style.fontSize(6)}
  @media ${Style.media('S')} {
    ${Style.fontSize(4)}
  }
`;

const Decoration = styled(TitleDecoration)`
  margin-left: -2rem;
  margin-bottom: 1rem;
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    data: state.projects,
    loading: _.size(state.projects) === 0 || state.loading.models.projects,
  };
};

const Dispatch = dispatch => ({
  getProjects() {
    dispatch({ type: `projects/get` });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Projects extends Component {
  componentDidMount() {
    setTitle('Projects');
    this.props.getProjects();
  }

  Title = () => {
    return (
      <TitleView mode="lazyScroll">
        <section key="title">
          <Decoration content={['2009 - 2013', null]} />
          <ExtraTitle>SCHOOL WORKS</ExtraTitle>
        </section>
      </TitleView>
    );
  };

  Showcase = ({ content }) => {
    const mapList = (item, i) => {
      let num = (i + 1).toString();
      return (
        <Item key={i} to={item.to}>
          <Cover style={{ backgroundImage: `url(${item.cover})` }} grey />
          <Mask />
          <Content>
            <Left>
              <Split />
              <Number>{num.length < 2 ? `0${num}` : num}</Number>
              <div style={{ zIndex: 1 }}>
                <ProjectTitle>{item.title}</ProjectTitle>
                <ProjectDesc>{item.type.toUpperCase()}</ProjectDesc>
              </div>
            </Left>
            <Button>VIEW PROJECT</Button>
          </Content>
        </Item>
      );
    };
    return (
      <Body delay={200} duration={1000} interval={200}>
        {content.map(mapList)}
      </Body>
    );
  };

  Main = () => (
    <div>
      <this.Showcase content={this.props.data.main} />
      <this.Title />
      <this.Showcase content={this.props.data.extra} />
    </div>
  );

  render() {
    return [
      <Header.PlaceHolder key="header" />,
      <MusicSwitch key="switch" minWidth={Style.screen.XL} />,
      <View key="view" css={Inner} type="bottom" duration={1000} interval={500}>
        <Title key="title" />
      </View>,
      this.props.loading ? <Loading key="loading" height="30vh" /> : <this.Main key="main" />,
    ];
  }
}

export default connect(
  State,
  Dispatch
)(Projects);
