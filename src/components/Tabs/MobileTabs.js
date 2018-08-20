import _ from 'lodash';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Style, MusicSwitch, Logo, View, ScrollToHide } from '../index';
import Motion from '../Motion';
import { Component } from 'react';
import { Link } from 'dva/router';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const TabView = styled(View)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  pointer-events: none;
`;

const Inner = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem !important;
  @media ${Style.media('S')} {
    padding: 1.5rem !important;
  }
`;

const Tab = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Style.fontSize(2.5)};
  font-weight: 500;
  color: #fff;
  &:before {
    position: absolute;
    content: '';
    background: ${props => (props.active === 'true' ? Style.color.gold : 'transparent')};
    display: block;
    width: 3rem;
    height: 0.8rem;
    z-index: -1;
    top: 1rem;
    margin-left: -1rem;
  }
`;

const MenuIcon = styled.div`
  pointer-events: auto;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0;
  cursor: pointer;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;

const MenuLogo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 3rem;
  @media ${Style.media('S')} {
    padding: 1.5rem;
  }
`;

const Line = styled.span`
  width: 1.5rem;
  border-radius: 1px;
  height: 2px;
  background: #000;
  transition: all 0.3s ease-out;
`;

const SideLine = Line.extend`
  ${props =>
    props.show &&
    css`
      background: transparent;
    `};
`;

const MidLine = Line.extend`
  &:before {
    display: block;
    content: '';
    width: 1.5rem;
    border-radius: 1px;
    height: 2px;
    background: #000;
    transition: all 0.3s ease-out;
  }
  ${props =>
    props.show &&
    css`
      transform: rotate(45deg);
      background: #fff;
      &:before {
        transform: rotate(-90deg);
        background: #fff;
      }
    `};
`;

const Menu = styled(Motion)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #222;
`;

const List = styled(Motion)`
  display: ${props => (props.show === 'true' ? 'block' : 'none')};
  pointer-events: auto;
  height: 20rem;
  width: 100%;

  a {
    pointer-events: auto;
  }
  a + a {
    margin-top: 3rem;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class MobileTabs extends Component {
  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
  };

  state = {
    showMenu: false,
  };

  render() {
    const { tabs = {}, activeTab = '' } = this.props;
    const { showMenu } = this.state;
    const duration = Style.duration.menu;
    const TabList = tabs => {
      const MapTabs = [];
      _.forEach(tabs, (to, key) => {
        const title = _.upperCase(key);
        MapTabs.push(
          <Tab
            key={key}
            title={title}
            active={(key === activeTab).toString()}
            to={to}
            onClick={this.handleMenuClick}
          >
            {title}
          </Tab>
        );
      });
      return MapTabs;
    };

    const Float = [
      <MenuLogo key="logo">
        <Logo size={2} color={['#fff']} alpha={0.3} />
      </MenuLogo>,
      <MusicSwitch key="switch" maxWidth={0} inMenu />,
    ];

    return (
      <TabView css={Inner}>
        <ScrollToHide>
          <Logo size={2} />
        </ScrollToHide>
        <div>
          <Menu mode="one" reverse={!this.state.showMenu} duration={duration} type="alpha">
            <List
              show={this.state.showMenu.toString()}
              type={['top', 'alpha']}
              delay={[duration, 0]}
              duration={duration}
              interval={[duration / 3, duration / 10]}
            >
              {this.state.showMenu ? TabList(tabs) : null}
            </List>
            {this.state.showMenu ? Float : null}
          </Menu>
          <MenuIcon onClick={this.handleMenuClick}>
            <SideLine show={showMenu} />
            <MidLine show={showMenu} />
            <SideLine show={showMenu} />
          </MenuIcon>
        </div>
      </TabView>
    );
  }

  handleMenuClick = () => {
    const html = document.documentElement;
    const body = document.body;
    if (this.state.showMenu) {
      html.style.overflowY = 'visible';
      body.style.overflowY = 'visible';
    } else {
      html.style.overflowY = 'hidden';
      body.style.overflowY = 'hidden';
    }
    this.setState({ showMenu: !this.state.showMenu });
  };
}

export default MobileTabs;
