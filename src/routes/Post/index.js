import { Component } from 'react';
import {
  Style,
  View,
  Markdown,
  Loading,
  Image,
  Motion,
  Header,
  MusicSwitch,
} from '../../components';
import styled from 'styled-components';
import { connect } from 'dva';
import _ from 'lodash';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////
const Article = styled(Motion)`
  padding: 0 1rem;
  position: relative;
  margin-bottom: 6rem;
`;

const Cover = styled.section`
  > img {
    width: 100%;
  }
`;

const Base = styled.section`
  max-width: 720px;
  margin: 0 auto;
`;

const ArticleHeader = Base.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  ${Style.fontSize(4)};
  text-align: center;
  font-weight: 500;
  margin-bottom: 3rem;
  @media ${Style.media('M')} {
    ${Style.fontSize(3.5)};
    margin-top: 1rem;
  }
  @media ${Style.media('S')} {
    ${Style.fontSize(3)};
    margin-top: 2rem;
  }
`;

const Tag = styled.div`
  ${Style.fontSize(0)};
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.08em;
`;

const Desc = styled.div`
  ${Style.fontSize(0, true)};
  text-align: center;
  margin: 2rem 0 4rem;
`;

const Split = styled.i`
  display: block;
  margin-bottom: -1.3rem;
  width: 3rem;
  height: 1px;
  background: ${Style.color.goldDark};
  z-index: -1;
  transition: all 0.5s ease;
`;

const Content = Base.extend`
  margin-top: 4rem;
`;

const Footer = Base.extend`
  margin-top: 6rem;
`;

const Moment = styled.div`
  text-align: right;
  font-weight: 500;
  color: #999;
`;

const Author = styled.section`
  max-width: 720px;
  margin: 6rem auto 0;
  border-top: 1px solid #e3e3e3;
  padding: 4rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contributor = styled.div`
  margin: 1.5rem;
  filter: grayscale(100%);
  transition: all 0.5s ease;
  &:hover {
    filter: grayscale(0);
  }
`;

const Avatar = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
`;

const Name = styled.div`
  text-align: center;
  margin-top: 1rem;
  ${Style.fontSize(-1)};
  color: #444;
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    post: state.posts,
    loading: _.size(state.posts) === 0 || state.loading.models.posts,
  };
};

const Dispatch = dispatch => ({
  getPost(name) {
    dispatch({ type: `posts/get`, payload: name });
  },
});

export const PostArticle = ({ content }) => {
  setTitle(content.title, content.desc);
  return (
    <Article type="bottom">
      <ArticleHeader key="header">
        <Title>{content.title}</Title>
        <Split />
        <Tag>{content.tag.toUpperCase()}</Tag>
        {content.desc ? <Desc>{content.desc}</Desc> : null}
      </ArticleHeader>
      {content.cover ? (
        <Cover key="cover">
          <MediaQuery minWidth={Style.screen.M}>
            <Image src={content.cover.l} style={{ maxWidth: 1920 / 2 + 'px', margin: '0 auto' }} />
          </MediaQuery>
          <MediaQuery minWidth={Style.screen.S} maxWidth={Style.screen.M}>
            <Image src={content.cover.m ? content.cover.m : content.cover.l + '!m'} />
          </MediaQuery>
          <MediaQuery maxWidth={Style.screen.S}>
            <Image src={content.cover.s ? content.cover.s : content.cover.l + '!s'} />
          </MediaQuery>
        </Cover>
      ) : null}
      <Content key="content">
        {content.body ? <Markdown content={content.body} /> : null}
        {content.content ? content.content : null}
      </Content>
      <Footer>
        {content.date ? <Moment>{moment(content.date).format('MMMM Do, YYYY')}</Moment> : null}
        {content.footer ? content.footer : null}
      </Footer>
      <Motion mode="lazyScroll" style={{ minHeight: '10rem' }}>
        <Author key="author">
          <Contributor>
            <Avatar>
              <Image src="/img/canisminor.jpg" grey />
            </Avatar>
            <Name>CanisMinor</Name>
          </Contributor>
        </Author>
      </Motion>
    </Article>
  );
};

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Post extends Component {
  state = {
    showButton: true,
    page: 1,
  };

  componentDidMount() {
    const name = _.last(location.pathname.split(/\//g));
    this.props.getPost(name);
  }

  render() {
    const { loading, post } = this.props;
    return [
      <Header.PlaceHolder key="header" />,
      <MusicSwitch key="switch" minWidth={Style.screen.XL} />,
      <View key="view">
        {loading ? <Loading height="50vh" /> : <PostArticle content={post} />}
      </View>,
    ];
  }
}

export default connect(
  State,
  Dispatch
)(Post);
