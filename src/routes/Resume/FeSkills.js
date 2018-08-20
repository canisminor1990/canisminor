import { View, Motion } from '../../components';
import { Component } from 'react';
import { Main, Tools } from './VdSkills';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  render() {
    return (
      <div>
        <View.Row text="Knowledge Map" line>
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
