import styled from 'styled-components';
import { Style, View, Motion, Button } from '../../components';
import { Component } from 'react';
import { Link } from 'dva/router';
import { Main } from '../Resume/VdSkills';
import textFormat from '../../utils/textFormat';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled(View.Row)`
  max-width: 60rem;
  margin: 3rem auto;
  > p {
    flex: 1;
    padding: 0.5rem 1rem;
  }
  @media ${Style.media('M')} {
    max-width: 25rem;
  }
`;

const Title = styled.p`
  ${Style.fontSize(1, true)};
  font-weight: 500;
  text-align: right;
  margin-top: 0.9rem;
  @media ${Style.media('M')} {
    text-align: left;
    br {
      display: none;
    }
  }
`;

const Desc = styled.p`
  ${Style.fontSize(-1, true)};
  color: #888;
      @media ${Style.media('M')} {
    text-align: left;
    br {
    display: none;
    }
`;
/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  Introduction = () => {
    return (
      <Content align="flex-start">
        <Title>{textFormat(this.props.data.title)}</Title>
        <Desc>{textFormat(this.props.data.desc[0])}</Desc>
        <Desc>{textFormat(this.props.data.desc[1])}</Desc>
      </Content>
    );
  };

  render() {
    return (
      <Intro>
        <Motion mode="lazyScroll">
          <Main key="main" content={this.props.data.skills} />
        </Motion>
        <Motion mode="lazyScroll">
          <this.Introduction key="intro" />
        </Motion>
        <Motion mode="lazyScroll">
          <Link key="btn" to="/resume">
            <Button>checkout my resume</Button>
          </Link>
        </Motion>
      </Intro>
    );
  }
}
