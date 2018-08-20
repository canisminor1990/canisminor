import { connect } from 'dva/index';
import { Component } from 'react';
import _ from 'lodash';
import {
  View,
  MusicSwitch,
  Style,
  Image,
  Motion,
  Header,
  Button,
  Loading,
} from '../../../components';
import queryString from 'query-string';
import { PostArticle } from '../../Post';
import styled from 'styled-components';
import { Link } from 'dva/router';
import textFormat from '../../../utils/textFormat';
import { FileUtils } from './index';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Desc = styled.p`
  text-align: center;
  ${Style.fontSize(0)};
  margin-bottom: 8rem;
  line-height: 2;
`;

const Page = styled.div`
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled(Image)`
  line-height: 0;
  overflow: hidden;
`;

const Shadow = styled.img`
  width: 100%;
  opacity: 0.2;
  line-height: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${Style.media('S')} {
    flex-direction: column-reverse;

    > a {
      width: 100%;
      margin-bottom: 1rem;
      > button {
        width: 100%;
      }
    }
  }
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    data: state.instantzine,
    loading: _.size(state.instantzine) === 0 || state.loading.models.instantzine,
  };
};

const Dispatch = dispatch => ({
  getInstantZine() {
    dispatch({ type: `instantzine/get` });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class InstantZinePost extends Component {
  state = {
    type: '',
    value: '',
  };

  componentDidMount() {
    this.props.getInstantZine();
    this.setState({ ...queryString.parse(location.search) });
  }

  Issue = ({ content }) => {
    const book = content.books[parseInt(this.state.value)];
    const next = parseInt(this.state.value) + 1;
    const ArticleData = {
      title: book.title[0],
      tag: book.title[1],
      content: <this.Book num={book.num} desc={book.desc} />,
      footer: (
        <Footer>
          <Link to="/projects/instant-zine">
            <Button>turn back</Button>
          </Link>
          {this.state.value < 23 ? (
            <Link
              to={
                `/projects/instant-zine/post?type=issue&value=${next}` +
                queryString.stringify({ type: 'issue', value: next })
              }
            >
              <Button type="black" onClick={() => this.setState({ value: next })}>{`next:${
                content.books[next].title[0]
              }`}</Button>
            </Link>
          ) : null}
        </Footer>
      ),
    };
    return <PostArticle content={ArticleData} />;
  };

  Book = ({ num, desc }) => {
    const mapPages = (item, i) => (
      <Motion key={i} mode="lazyScroll" style={{ minHeight: '5rem' }}>
        <Page key="page">
          <Img src={item} grey>
            <Shadow src={FileUtils.shadow} />
          </Img>
        </Page>
      </Motion>
    );
    return (
      <div>
        <Image key="cover" src={FileUtils.cover(num)} grey />
        <Desc>{textFormat(desc)}</Desc>
        {FileUtils.pages(num).map(mapPages)}
      </div>
    );
  };

  Intro = ({ content }) => {
    const ArticleData = content.intro;
    return (
      <PostArticle
        content={{
          ...ArticleData,
          footer: (
            <Footer>
              <span />
              <Link to="/projects/instant-zine">
                <Button>turn back</Button>
              </Link>
              <span />
            </Footer>
          ),
        }}
      />
    );
  };

  Main = ({ content }) =>
    this.state.type === 'issue' ? (
      <this.Issue content={content} />
    ) : (
      <this.Intro content={content} />
    );

  render() {
    return [
      <Header.PlaceHolder key="header" />,
      <MusicSwitch key="switch" minWidth={Style.screen.XXL} />,
      <View key={this.state.value} type="bottom" mode="one">
        {this.props.loading ? <Loading /> : <this.Main content={this.props.data} />}
      </View>,
    ];
  }
}

export default connect(
  State,
  Dispatch
)(InstantZinePost);
