import styled from 'styled-components';
import { Style, Loading, Motion, Button, View } from '../../components';
import { Component } from 'react';
import { Link } from 'dva/router';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Body = styled(View.Row)`
  max-width: 1024px;
  overflow: hidden;
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  @media ${Style.media('M')} {
    padding: 0 1rem;
  }
`;

const Item = styled(Link)`
  flex: 1;
  min-width: 50%;
  display: block;
  position: relative;
  @media ${Style.media('M')} {
    width: 100%;
  }
`;

const Cover = styled.div`
  display: block;
  width: 100%;
  position: relative;
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 6rem;
  transition: all 0.5s ease-in-out;
  filter: brightness(120%) contrast(120%) grayscale(100%);
  ${Item}:hover & {
    filter: brightness(100%) contrast(100%) grayscale(0%);
  }
`;

const Mask = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
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
`;

const Split = styled.div`
  height: 1px;
  background: #222;
  width: 0;
  margin-right: 3rem;
  transition: all 0.5s ${Style.ease.normal};
  ${Item}:hover & {
    background: #fff;
    width: 3rem;
    margin-right: 1.5rem;
  }
`;

const ProjectTitle = styled.div`
  font-weight: 600;
  transition: all 0.5s ${Style.ease.normal};
  ${Style.fontSize(1, true)};
  ${Item}:hover & {
    color: #fff;
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

const More = styled(Motion)`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  width: 100%;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Design extends Component {
  Showcase = ({ content }) => {
    const mapList = (item, i) => {
      return (
        <Item key={i} to={item.to}>
          <Cover style={{ backgroundImage: `url(${item.cover})` }} grey />
          <Mask />
          <Content>
            <Split />
            <div style={{ zIndex: 1 }}>
              <ProjectTitle>{item.title}</ProjectTitle>
              <ProjectDesc>{item.type.toUpperCase()}</ProjectDesc>
            </div>
          </Content>
        </Item>
      );
    };
    return <Body>{content.map(mapList)}</Body>;
  };

  render() {
    return (
      <View>
        <Motion mode="lazyScroll">
          {this.props.loading ? (
            <Loading key="loading" height="10rem" />
          ) : (
            <this.Showcase key="main" content={this.props.data} />
          )}
        </Motion>
        <More mode="lazyScroll">
          <Link key="link" to="/projects">
            <Button>view more projects</Button>
          </Link>
        </More>
      </View>
    );
  }
}

export default Design;
