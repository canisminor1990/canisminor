import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Component } from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { Throttle } from '../../utils/event';
import { Style } from '../index';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const ScrollView = styled.div`
  transition: all 0.3s ease !important;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class ScrollToHide extends Component {
  static propTypes = {
    maxOffset: PropTypes.number,
  };

  state = {
    showMenu: false,
    offset: 0,
  };

  Scroll = () => {
    this.setState({ offset: window.pageYOffset });
  };

  componentDidMount() {
    this.scrollEvent = addEventListener(window, 'scroll', Throttle(this.Scroll, 50));
    this.Scroll();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  render() {
    const { maxOffset = 50, fixPos, children } = this.props;
    const ScrollStyle = {
      position: fixPos ? 'absolute' : 'relative',
      zIndex: fixPos ? Style.zIndex.mask : 'inherit',
      opacity: this.state.offset > maxOffset ? 0 : 1,
    };
    return <ScrollView style={ScrollStyle}>{children}</ScrollView>;
  }
}

export default ScrollToHide;
