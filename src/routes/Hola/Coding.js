import _ from 'lodash';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import { Style, Image, Loading, Motion, Button } from '../../components';
import { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 0 3rem 3rem;
  @media ${Style.media('S')} {
    padding: 0 0 3rem;
  }
`;

const Card = styled.a`
  display: flex;
  min-width: 20rem;
  flex: 1;
  padding: 1rem;
  margin: 0.5rem;
  transition: all 0.5s ${Style.ease.normal};
  border-radius: 0.25rem;
  &:hover {
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.05);
    transform: scale(1.1);
  }
`;

const Cover = styled(Image)`
  width: 3rem;
  height: 3rem;
`;

const Content = styled.div`
  margin-left: 1rem;
  flex: 1;
`;

const Title = styled.div`
  font-weight: 500;
  ${Style.fontSize(1)};
  margin-bottom: 0.5rem;
`;

const Desc = styled.div`
  ${Style.fontSize(-1, true)};
  margin-bottom: 0.5rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Type = styled.div`
  ${Style.fontSize(-2)};
  color: ${Style.color.goldDark};
  > span {
    margin-left: 0.5rem;
    font-family: ${Style.fontFamily.times};
    color: #888;
    font-style: italic;
  }
`;

const GithubGraph = styled.div`
  display: flex;
  margin-top: 6rem;
  align-items: flex-end;
`;

const GithubItem = styled.div`
  width: 1rem;
  height: 1rem;
  position: relative;
  cursor: pointer;
  &:hover {
    section {
      display: flex;
    }
  }
  @media ${Style.media('L')} {
    width: 1.5vw;
    height: 1.5vw;
    font-size: 1.5vw;
  }
`;

const Bg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
`;

const Pop = styled.section`
  display: none;
  position: absolute;
  background: #fff;
  padding: 0.5rem 1rem;
  z-index: 10;
  width: 14rem;
  font-weight: 500;
  border-radius: 0.2rem;
  ${Style.fontSize(-2)};
  top: -2rem;
  left: -6rem;
  box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.1);
  > span {
    opacity: 0.6;
    margin-left: 0.3rem;
  }
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 0.5rem;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    bottom: -0.9rem;
    left: 6rem;
  }
`;

const MotionView = styled(Motion)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Month = GithubItem.extend`
  margin-bottom: 0.5rem;
  ${Style.fontSize(-2)};
`;

const Week = GithubItem.extend`
  ${Style.fontSize(-2)};
  margin-right: 1rem;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const State = state => {
  return {
    github: state.github,
    loading: _.size(state.github) === 0 || state.loading.models.github,
  };
};

const Dispatch = dispatch => ({
  getGithub(page = 1) {
    dispatch({ type: 'github/get', payload: page });
  },
});

class Coding extends Component {
  componentDidMount() {
    this.props.getGithub();
  }

  GraphStyle = {
    '#ebedf0': '#f8f8f8',
    '#7bc96f': '#f1e3c8',
    '#c6e48b': '#e2ca9c',
    '#239a3b': '#bfa677',
    '#196127': '#9d8352',
  };

  Main = () => {
    const mapMain = (item, i) => (
      <Card key={i} href={item.href} target="_blank" rel="noopener noreferrer">
        <Cover src={item.cover} />
        <Content>
          <Title>{item.title}</Title>
          <Desc>{item.desc}</Desc>
          <Type>
            -<span>{item.type}</span>
          </Type>
        </Content>
      </Card>
    );
    return <Main>{this.props.data.map(mapMain)}</Main>;
  };

  Contributions = () => {
    const mapContributions = (item, i) => {
      let month = '';
      if (i % 4 === 1) month = moment(item[0].date, 'YYYY-MM-DD').format('MMM');
      return (
        <div key={i}>
          <Month>{month}</Month>
          {item.map(mapGroup)}
        </div>
      );
    };
    const mapGroup = (item, i) => {
      return (
        <GithubItem key={i}>
          <Bg style={{ color: this.GraphStyle[item.color] }}>●</Bg>
          <Pop>
            {item.count} contributions <span>on {item.date}</span>
          </Pop>
        </GithubItem>
      );
    };
    const Weeks = [<Week key="0" />];
    this.props.github[0].map((item, i) => {
      let week = '';
      if (i % 2 === 1) week = moment(item.date, 'YYYY-MM-DD').format('ddd');
      Weeks.push(
        <Week key={item.date} i={i}>
          <span>{week}</span>
        </Week>
      );
    });

    return (
      <GithubGraph>
        <div>{Weeks}</div>
        {this.props.github.map(mapContributions)}
      </GithubGraph>
    );
  };

  render() {
    return (
      <div>
        <MotionView mode="lazyScroll">
          <this.Main key="main" />
        </MotionView>
        <MotionView mode="lazyScroll">
          <a
            key="btn"
            href="https://github.com/canisminor1990"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>view more repos</Button>
          </a>
        </MotionView>
        <MediaQuery key="desktop" minWidth={Style.screen.S}>
          <MotionView mode="lazyScroll">
            {this.props.loading ? (
              <Loading height="10rem" />
            ) : (
              <this.Contributions key="contributions" />
            )}
          </MotionView>
        </MediaQuery>
      </div>
    );
  }
}

export default connect(
  State,
  Dispatch
)(Coding);
