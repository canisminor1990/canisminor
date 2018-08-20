import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import styled, { css } from 'styled-components';
import { Component } from 'react';
import { Link, Element } from 'react-scroll';
import { Style, Icon, View, Motion } from '../';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Inner = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const List = styled(Motion)`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
  color: ${Style.color.goldDark};
  ${Style.fontSize(-2)} > a {
    display: flex;
    align-items: center;
    pointer-events: auto;
    > span {
      opacity: 0;
      transform: translate3d(1rem, 0, 0);
      transition: all 0.4s ${Style.ease.normal};
    }
    + a {
      margin-top: 1rem;
    }
    &:hover {
      > span {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
      .icon-toc:before {
        color: #eee;
      }
    }
  }
  .icon-toc:before {
    transition: all 0.4s ${Style.ease.normal};
    color: #d0d0d0;
    margin-left: 0.5rem;
  }

  .active {
    > span {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    .icon-toc:before {
      color: ${Style.color.goldDark} !important;
      content: '\\e652' !important;
    }
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Anchor extends Component {
  static propTypes = {
    toc: PropTypes.array,
    minWidth: PropTypes.number,
  };

  static Element = Element;

  Link = (item, i) => (
    <Link key={i} activeClass="active" to={item.to} spy={true} smooth={true} duration={300}>
      <span>{item.title}</span>
      <Icon type="toc" />
    </Link>
  );

  render() {
    const { minWidth = Style.screen.M } = this.props;
    return (
      <MediaQuery minWidth={minWidth}>
        <View.Mask css={Inner}>
          <List mode="one" type="alpha" delay={500}>
            {this.props.toc.map(this.Link)}
          </List>
        </View.Mask>
      </MediaQuery>
    );
  }
}

export default Anchor;
