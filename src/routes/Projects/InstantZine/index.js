import { connect } from 'dva';
import { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
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
import { Link } from 'dva/router';
import setTitle from '../../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const VideoCase = styled.div`
  display: flex;
  padding: 0 6rem;
  position: relative;
  margin-bottom: 6rem;
  align-items: center;
  > video {
    width: 50%;
    height: 50%;
    flex: 2;
    margin-right: 1rem;
    background: #222;
    overflow: hidden;
  }
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media ${Style.media('M')} {
    flex-direction: column;
    padding: 0;
    > video {
      width: 100%;
      height: 50%;
      margin-right: 0;
      margin-bottom: 6rem;
    }
  }
`;
const VideoTitle = styled.div`
  font-weight: 500;
  ${Style.fontSize(4, true)};
`;

const VideoSubTitle = styled.div`
  ${Style.fontSize(2, true)};
  margin-bottom: 2rem;
`;

const VideoDesc = styled.div`
  margin-top: 1rem;
  ${Style.fontSize(-2, true)};
  color: #999;
`;

const List = styled(Motion)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  padding: 0 2rem;
`;

const Item = styled(Link)`
  width: calc(100% / 4);
  position: relative;
  margin-bottom: 4rem;

  @media ${Style.media('L')} {
    width: calc(100% / 3);
  }
  @media ${Style.media('M')} {
    width: calc(100% / 2);
  }
  @media ${Style.media('MS')} {
    width: 100%;
  }
`;

const BookCase = styled(Motion)`
  transition: all 0.5s ${Style.ease.normal};
  border-radius: 0.25rem;
  &:hover {
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.05);
    transform: scale(1.1);
  }
`;

const Book = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const Cover = styled(Image)`
  width: 15rem;
  height: 15rem;
`;

const Title = styled.div`
  ${Style.fontSize(1, true)};

  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
`;

const Subtitle = styled.div`
  ${Style.fontSize(-2, true)};
  color: #999;
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

export const FileUtils = {
  video: 'http://qn-video.canisminor.cc/instant-zine.mp4',
  videoCover: 'http://qn-video.canisminor.cc/instant-zine.png',
  pages: book => {
    let pages = [];
    for (let i = 2; i <= 12; i++) {
      pages.push(`http://qn.canisminor.cc/zine-${book}-${i}.png`);
    }
    return pages;
  },
  cover: book => `http://qn.canisminor.cc/zine-${book}-cover.png`,
  coverLite: book => `http://qn.canisminor.cc/zine-${book}-cover-lite.png`,
  shadow: 'http://qn.canisminor.cc/zine-shadow.png',
};

class InstantZine extends Component {
  componentDidMount() {
    setTitle('须臾映社');
    this.props.getInstantZine();
  }

  Video = () => {
    return (
      <VideoCase>
        <video
          id="InstantZine"
          controls
          playsInline
          playload="metadata"
          webkit-playsinline="true"
          x5-playsinline="true"
          x-webkit-airplay="allow"
          poster={FileUtils.videoCover}
        >
          <source src={FileUtils.video} type="video/mp4" />
        </video>
        <div>
          <VideoTitle>须臾映社</VideoTitle>
          <VideoSubTitle>Instant-Zine</VideoSubTitle>
          <Link to="/projects/instant-zine/post">
            <Button>Introduction</Button>
          </Link>
          <VideoDesc>24 pages / 200 x 270 mm </VideoDesc>
        </div>
      </VideoCase>
    );
  };

  List = ({ content }) => {
    const MapBooks = (item, key) => (
      <Item key={key} to={`/projects/instant-zine/post?type=issue&value=${key}`}>
        <BookCase mode="lazyScroll" playScale={0.2} style={{ minHeight: '10rem' }}>
          <Book key="book">
            <Cover src={FileUtils.coverLite(item.num)} />
            <Title>{item.title[0]}</Title>
            <Subtitle>{item.title[1].toUpperCase()}</Subtitle>
          </Book>
        </BookCase>
      </Item>
    );
    return <List>{content.books.map(MapBooks)}</List>;
  };

  render() {
    return [
      <Header.PlaceHolder key="header" />,
      <MusicSwitch key="switch" minWidth={Style.screen.XXL} />,
      <View key="view" type="bottom" mode="one">
        <this.Video />
        {this.props.loading ? <Loading height="30vh" /> : <this.List content={this.props.data} />}
      </View>,
    ];
  }
}

export default connect(
  State,
  Dispatch
)(InstantZine);
