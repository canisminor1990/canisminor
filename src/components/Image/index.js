import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Component } from 'react';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Image = styled.span`
  position: relative;
  overflow: hidden;
  display: block;
  line-height: 0;
  &:before {
    transform: ${props => (props.load ? 'translate3d(-100%,0,0)' : 'translate3d(0,0,0)')};
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    transition: all 0.5s ease;
    background: ${props => (props.grey ? '#f8f8f8' : '#fff')};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

const Img = styled.img`
  width: 100%;
`;

/// /////////////////////////////////////////////
// components
/// /////////////////////////////////////////////

export default class extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  state = {
    load: false,
  };

  render() {
    const { src = '', grey, children, ...other } = this.props;
    return (
      <Image load={this.state.load} grey={grey} {...other}>
        <Img src={src} onLoad={this.onLoad} />
        {children}
      </Image>
    );
  }

  onLoad = () => {
    this.setState({ load: true });
  };
}
