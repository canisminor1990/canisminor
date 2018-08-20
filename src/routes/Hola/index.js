import _ from 'lodash';
import { Component } from 'react';
import {
  Style,
  Anchor,
  View,
  MusicSwitch,
  Motion,
  TitleDecoration,
  Loading,
} from '../../components';
import styled, { css } from 'styled-components';
import Welcome from './Welcome';
import Intro from './Intro';
import Design from './Design';
import Coding from './Coding';
import Article from './Article';
import Contact from './Contact';
import { connect } from 'dva';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const HolaView = styled(View)`
  background: #fff;
  border-top: solid 0.5px rgba(0, 0, 0, 0.08);
  padding: 10rem 1rem;
  overflow: hidden;
  min-height: 50vh;
  @media ${Style.media('M')} {
    padding: 8rem 1rem;
  }
  @media ${Style.media('S')} {
    padding: 6rem 1rem;
  }
`;

const Inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Decoration = styled(TitleDecoration)`
  margin-left: -2rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-weight: 600;
  color: transparent;
  -webkit-text-stroke: 1px #222;
  margin-bottom: 8rem;
  ${Style.fontSize(6)}
  @media ${Style.media('S')} {
    ${Style.fontSize(5)}
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const State = state => {
  return {
    hola: state.hola,
    loading: _.size(state.hola) === 0 || state.loading.models.hola,
  };
};

const Dispatch = dispatch => ({
  getHola() {
    dispatch({ type: 'hola/get' });
  },
});

class Hola extends Component {
  componentDidMount() {
    setTitle();
    this.props.getHola();
  }

  toc = [
    { title: 'Welcome', to: 'welcome' },
    { title: 'Intro', to: 'intro' },
    { title: 'Design', to: 'design' },
    { title: 'Coding', to: 'coding' },
    { title: 'Article', to: 'article' },
  ];

  Title = ({ title, num }) => {
    return (
      <Motion mode="lazyScroll">
        <section key="title">
          <Decoration content={[num, null]} />
          <Title>{title}</Title>
        </section>
      </Motion>
    );
  };

  View = ({ name, title, children }) => {
    return (
      <Anchor.Element name={name}>
        <HolaView css={Inner}>
          <this.Title title={title[1].toUpperCase()} num={title[0]} />
          {children}
        </HolaView>
      </Anchor.Element>
    );
  };

  Body = () =>
    this.props.loading ? (
      <HolaView css={Inner}>
        <Loading />
      </HolaView>
    ) : (
      [
        <this.View key="intro" name="intro" title={['01', 'Intro']}>
          <Intro data={this.props.hola.intro} />
        </this.View>,
        <this.View key="design" name="design" title={['02', 'design']}>
          <Design data={this.props.hola.design} />
        </this.View>,
        <this.View key="coding" name="coding" title={['03', 'coding']}>
          <Coding data={this.props.hola.coding} />
        </this.View>,
        <this.View key="article" name="article" title={['04', 'article']}>
          <Article data={this.props.hola.article} />
        </this.View>,
        <Contact key="contact" />,
      ]
    );

  render() {
    return [
      <MusicSwitch key="switch" />,
      <Anchor key="toc" toc={this.toc} />,
      <Anchor.Element key="welcome" name="welcome">
        <Welcome />
      </Anchor.Element>,
      <this.Body key="body" />,
    ];
  }
}

export default connect(
  State,
  Dispatch
)(Hola);
