import _ from 'lodash';
import { Component } from 'react';
import {
  Style,
  Anchor,
  View,
  MusicSwitch,
  TitleDecoration,
  Motion,
  Loading,
} from '../../components';
import styled, { css } from 'styled-components';
import { connect } from 'dva';
import Intro from './Intro';
import Background from './Background';
import About from './About';
import Education from './Education';
import Experience from './Experience';
import VdSkills from './VdSkills';
import FeSkills from './FeSkills';
import Specialities from './Specialities';
import Download from './Download';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const ResumeView = styled(View)`
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
    resume: state.resume,
    loading: _.size(state.resume) === 0 || state.loading.models.resume,
  };
};

const Dispatch = dispatch => ({
  getReusme() {
    dispatch({ type: 'resume/get' });
  },
});

class Resume extends Component {
  componentDidMount() {
    setTitle('Resume');
    this.props.getReusme();
  }

  toc = [
    { title: 'Intro', to: 'welcome' },
    { title: 'About', to: 'about' },
    { title: 'Education', to: 'education' },
    { title: 'Experience', to: 'experience' },
    { title: 'VD Skills', to: 'vd skills' },
    { title: 'FE Skills', to: 'fe skills' },
    { title: 'Specialities', to: 'specialities' },
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
        <ResumeView css={Inner}>
          <this.Title title={title[1].toUpperCase()} num={title[0]} />
          {children}
        </ResumeView>
      </Anchor.Element>
    );
  };

  Body = () =>
    this.props.loading ? (
      <ResumeView css={Inner}>
        <Loading />
      </ResumeView>
    ) : (
      [
        <this.View key="about" name="about" title={['01', 'about me']}>
          <About data={this.props.resume.about} />
        </this.View>,
        <this.View key="education" name="education" title={['02', 'education']}>
          <Education data={this.props.resume.education} />
        </this.View>,
        <this.View key="experience" name="experience" title={['03', 'experience']}>
          <Experience data={this.props.resume.experience} />
        </this.View>,
        <this.View key="vd skills" name="vd skills" title={['04', 'vd skills']}>
          <VdSkills data={this.props.resume.vdskills} />
        </this.View>,
        <this.View key="fe skills" name="fe skills" title={['05', 'fe skills']}>
          <FeSkills data={this.props.resume.feskills} />
        </this.View>,
        <this.View key="specialities" name="specialities" title={['06', 'specialities']}>
          <Specialities data={this.props.resume.specialities} />
        </this.View>,
        <Download data={this.props.resume.downloads} key="download" />,
      ]
    );

  render() {
    return [
      <MusicSwitch key="switch" />,
      <Background key="background" />,
      <Anchor key="toc" toc={this.toc} minWidth={Style.screen.XL} />,
      <Anchor.Element key="welcome" name="welcome">
        <Intro />
      </Anchor.Element>,
      <this.Body key="body" />,
    ];
  }
}

export default connect(
  State,
  Dispatch
)(Resume);
