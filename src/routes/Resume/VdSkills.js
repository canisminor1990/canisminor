import styled from 'styled-components';
import { Style, Image, View, Motion } from '../../components';
import { Component } from 'react';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  margin: 0.5rem 1rem;
  > p {
    text-align: center;
    ${Style.fontSize(-2, true)};
  }
  @media ${Style.media('XL')} {
    margin: 0.5rem;
  }
`;

const Icon = styled(Image)`
  width: 3rem;
  height: 3rem;
`;

const ToolRow = Row.extend`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1024px;
  margin-top: 6rem;
`;

const ToolBox = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  border-radius: 2rem;
  padding: 0 1rem 0 0.5rem;
  background: #fff;
  box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.04);
  margin: 0.5rem;
`;

const ToolIcon = styled(Image)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export const Main = ({ content, ...other }) => {
  const mapMain = (item, i) => (
    <Box key={i}>
      <Icon src={item.icon} />
      <p>{item.title}</p>
    </Box>
  );
  return <Row {...other}>{content.map(mapMain)}</Row>;
};

export const Tools = ({ content, ...other }) => {
  const mapTools = (item, i) => (
    <ToolBox key={i}>
      <ToolIcon src={item.icon} />
      <p>{item.title}</p>
    </ToolBox>
  );
  return <ToolRow {...other}>{content.map(mapTools)}</ToolRow>;
};

export default class extends Component {
  render() {
    return (
      <div>
        <View.Row text="Productivity Tools" line>
          <Motion mode="lazyScroll">
            <Main key="main" content={this.props.data.main} />
          </Motion>
        </View.Row>
        <View.Row>
          <Motion mode="lazyScroll">
            <Tools key="tools" content={this.props.data.tools} />
          </Motion>
        </View.Row>
      </div>
    );
  }
}
