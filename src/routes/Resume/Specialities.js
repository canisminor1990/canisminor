import styled, { css } from 'styled-components';
import { Style, Image, Button, View, Motion } from '../../components';
import { Component } from 'react';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.div`
  max-width: 720px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
`;

const Desc = styled.p`
  ${Style.fontSize(0, true)} margin: 4rem 2rem;
  text-align: center;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  Main = ({ content }) => {
    const mapMain = (item, i) => (
      <Motion key={i} mode="lazyScroll">
        <Box key="box">
          <Image src={item.img} grey />
          <Desc>{item.desc}</Desc>
          <a href={item.button.href} target="_blank" rel="noopener noreferrer">
            <Button>{item.button.title}</Button>
          </a>
        </Box>
      </Motion>
    );
    return <Main>{content.map(mapMain)}</Main>;
  };

  render() {
    return (
      <View css={Inner}>
        <View.Row text="Thank you for scrolling" line>
          <this.Main key="main" content={this.props.data} />
        </View.Row>
      </View>
    );
  }
}
