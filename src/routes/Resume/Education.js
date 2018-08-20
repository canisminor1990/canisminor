import styled from 'styled-components';
import { Style, Image, Icon, Motion } from '../../components';
import { Component } from 'react';
import { Infomation } from './About';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Caa = styled(Image)`
  max-width: 360px;
  margin: 0 auto;
  margin-bottom: 6rem;
  @media ${Style.media('S')} {
    max-width: 80%;
  }
`;

const Awards = styled(Motion)`
  ${Style.fontSize(-1, true)};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8rem;
`;

const AwardsList = styled.div`
  margin-bottom: 2rem;
`;

const AwardsItem = styled.div`
  margin-bottom: 1rem;
  width: 20rem;
  display: flex;
  > i {
    margin-right: 1rem;
    line-height: 1.5rem;
    color: ${Style.color.goldDark};
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  Awards = () => {
    const mapItem = (item, i) => {
      item = item.split('|');
      return (
        <AwardsItem key={i}>
          <Icon type={i === 0 ? 'point-main' : 'point'} />
          <div>
            <div>{item[0]}</div>
            <div>{item[1]}</div>
          </div>
        </AwardsItem>
      );
    };
    const mapList = (item, i) => <AwardsList key={i}>{item.map(mapItem)}</AwardsList>;
    return (
      <Awards mode="lazyScroll" type="bottom">
        {this.props.data.awardList.map(mapList)}
      </Awards>
    );
  };

  render() {
    return (
      <div>
        <Motion mode="lazyScroll">
          <Caa key="1" src="/img/resume-education-caa.png" />
        </Motion>
        <Motion mode="lazyScroll">
          <Infomation
            key="2"
            content={this.props.data.showcase}
            text="Awards & Recongnitions"
            line
          />
        </Motion>
        <this.Awards />
      </div>
    );
  }
}
