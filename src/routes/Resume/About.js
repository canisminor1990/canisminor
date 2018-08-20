import styled from 'styled-components';
import { Style, Image, Icon, View, Motion } from '../../components';
import { Component } from 'react';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Avatar = styled(Image)`
  width: 193px;
`;

const Content = styled.div`
  margin: 0 0 0 4rem;
  max-width: 28rem;
  > p {
    margin-top: 2rem;
    text-align: justify;
    ${Style.fontSize(0, true)};
  }
  @media ${Style.media('M')} {
    margin: 4rem 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Gif = styled(Image)`
  max-width: 600px;
  margin: 4rem auto;
`;

const Showcase = styled.div`
  flex: 1;
  padding: 2rem;
  min-width: 18rem;
`;

const Title = styled.div`
  text-align: center;
  ${Style.fontSize(1, true)};
`;

const Desc = styled.div`
  text-align: center;
  font-weight: 600;
  margin-top: 0.5rem;
  ${Style.fontSize(2.5, true)};
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export const Infomation = ({ line, content, ...other }) => {
  const mapShowcase = (item, i) => (
    <Showcase key={i}>
      <Title>{item.title.toUpperCase()}</Title>
      <Desc>{item.desc}</Desc>
    </Showcase>
  );
  return (
    <View.Row line={line} {...other}>
      {content.map(mapShowcase)}
    </View.Row>
  );
};

export default class extends Component {
  Intro = () => (
    <View.Row line>
      <Avatar src="/img/resume-about-avatar.png" />
      <Content>
        <Icon type="name" size={2} />
        <p>{this.props.data.introduction}</p>
      </Content>
    </View.Row>
  );

  render() {
    return (
      <div>
        <Motion mode="lazyScroll">
          <this.Intro key="1" />
        </Motion>
        <Motion mode="lazyScroll">
          <Gif key="2" src="/img/resume-about.gif" />
        </Motion>
        <Motion mode="lazyScroll">
          <Infomation key="3" content={this.props.data.showcase} />
        </Motion>
      </div>
    );
  }
}
