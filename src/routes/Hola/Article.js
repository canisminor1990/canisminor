import _ from 'lodash';
import styled from 'styled-components';
import { Style, Loading, Motion, Button } from '../../components';
import { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
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

const Card = styled(Link)`
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

const Tag = styled.span`
  ${Style.fontSize(-2, true)};
  color: #999;
  color: ${Style.color.goldDark};
  font-weight: 500;
  font-family: ${Style.fontFamily.times};
  font-style: italic;
  margin-right: 0.5rem;
`;

const Date = styled.span`
  ${Style.fontSize(-2, true)};
  color: #999;
  font-family: ${Style.fontFamily.times};
  font-style: italic;
`;

const MotionView = styled(Motion)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const State = state => {
  return {
    data: state.blog,
    loading: _.size(state.blog) === 0 || state.loading.models.blog,
  };
};

const Dispatch = dispatch => ({
  getPage(page = 1) {
    dispatch({ type: `blog/get`, payload: page });
  },
});

class Coding extends Component {
  componentDidMount() {
    this.props.getPage();
  }

  Main = ({ content }) => {
    const mapMain = (item, i) => {
      if (i > 5) return;
      return (
        <Card key={i} to={`/blog/posters/${item.filename}`}>
          <Content>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            <div>
              <Tag>- {item.tag.toLowerCase()}</Tag>
              <Date>{moment(item.date).format('MMM Do, YYYY')}</Date>
            </div>
          </Content>
        </Card>
      );
    };
    return <Main>{content.toc.map(mapMain)}</Main>;
  };

  render() {
    return (
      <div>
        <MotionView mode="lazyScroll">
          {this.props.loading ? (
            <Loading key="loading" height="10rem" />
          ) : (
            <this.Main key="main" content={this.props.data[1]} />
          )}
        </MotionView>
        <MotionView mode="lazyScroll">
          <Link key="link" to="/blog">
            <Button>view my blog</Button>
          </Link>
        </MotionView>
      </div>
    );
  }
}

export default connect(
  State,
  Dispatch
)(Coding);
