import { Component } from 'react';
import styled, { css } from 'styled-components';
import { Style, TitleDecoration, Typist, View, Motion, MusicSwitch } from '../../components';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////
const Showcase = styled.div`
  width: 20rem;
  height: 10rem;
  background: #333;
`;

const Highlight = styled.div`
  width: 1rem;
  height: 10rem;
  background: #fff;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Dev extends Component {
  render() {
    return (
      <View>
        <h1>Test</h1>
        <Showcase>
          <Highlight />
        </Showcase>
      </View>
    );
  }
}

export default Dev;
