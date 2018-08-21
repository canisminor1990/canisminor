import styled from 'styled-components';
import { Style, Image, View, Motion } from '../../components';
import { Component } from 'react';
import { rgba } from 'polished';
import textFormat from '../../utils/textFormat';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////
const List = styled(View.Row)`
  + div {
    margin-top: 4rem;
  }
`;

const Cover = styled(Image)`
  width: 120px;
  height: 120px;
  box-shadow: ${props => rgba(props.color, 0.25)} 0px 12px 24px 0px;
`;
const Content = styled.div`
  flex: 1;
  margin: 0 0 0 2rem;
  @media ${Style.media('M')} {
    text-align: center;
    margin: 2rem 0 0 0;
  }
`;
const Title = styled.div`
  font-weight: 600;
  ${Style.fontSize(2)};
  margin-bottom: 1rem;
`;

const Time = styled.div`
  ${Style.fontSize(-1, true)};
  margin-bottom: 1rem;
  > span {
    font-family: ${Style.fontFamily.times};
    font-style: italic;
  }
`;
const Desc = styled.div`
  ${Style.fontSize(-1, true)};
  text-align: justify;
  @media ${Style.media('M')} {
    max-width: 30rem;
    text-align: center;
    br {
      display: none;
    }
  }
`;

const Extra = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 6rem;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
`;

const ExtraItem = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  border-radius: 2rem;
  padding: 0 1.5rem 0 0.5rem;
  background: #fff;
  box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.04);
  margin: 0.5rem;
`;

const ExtraCover = styled(Image)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const ExtraTitle = styled.div`
  font-weight: 600;
  ${Style.fontSize(1)};
`;

const ExtraDesc = styled.div`
  ${Style.fontSize(-1, true)};
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  Main = () => {
    const mapMain = (item, i) => (
      <List key={i} align="flex-start">
        <Cover src={item.img} color={item.color} />
        <Content>
          <Title>{item.title}</Title>
          <Time>
            <span>{item.time[0]}</span>
            {item.time[1]}
          </Time>
          <Desc>{textFormat(item.desc)}</Desc>
        </Content>
      </List>
    );
    return <div>{this.props.data.main.map(mapMain)}</div>;
  };

  Extra = () => {
    const mapExtra = (item, i) => (
      <ExtraItem key={i}>
        <ExtraCover src={item.img} />
        <div>
          <ExtraTitle>{item.title}</ExtraTitle>
          <ExtraDesc>{item.desc}</ExtraDesc>
        </div>
      </ExtraItem>
    );
    return <Extra>{this.props.data.extra.map(mapExtra)}</Extra>;
  };

  render() {
    return (
      <div>
        <View.Row text="Extra Identities" line>
          <Motion mode="lazyScroll">
            <this.Main key="main" />
          </Motion>
        </View.Row>
        <Motion mode="lazyScroll">
          <this.Extra key="extra" />
        </Motion>
      </div>
    );
  }
}
