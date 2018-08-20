import { Component } from 'react';
import MediaQuery from 'react-responsive';
import { View, Icon, Style, Motion, ScrollToHide } from '../';
import styled from 'styled-components';
import _ from 'lodash';
import PropTypes from 'prop-types';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Container = styled(Motion)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SiteNameView = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    writing-mode: tb-rl;
    transform: rotate(180deg);
    font-family: ${Style.fontFamily.times};
    font-style: italic;
    ${Style.fontSize(-2)};
    margin-bottom: 1rem;
    > span {
      margin-top: 1rem;
    }
  }
`;

const SwitchView = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  ${Style.fontSize(-1)};
`;

const SwitchBtn = styled.div`
  margin: 0 0.1rem;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  pointer-events: auto;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class MusicSwitch extends Component {
  state = {
    switch: false,
  };

  componentDidMount() {
    if (window.localStorage.music === 'true') this.SwitchOn();
  }

  SiteName = () => {
    const activeTab = _.upperFirst(location.pathname.split('/')[1] || 'hola');
    return (
      <SiteNameView style={{ color: this.props.inMenu ? '#fff' : Style.color.goldDark }}>
        <div>
          Canisminor.cc
          <span>{activeTab}</span>
        </div>
        <Icon type="mouse" size={1.5} />
      </SiteNameView>
    );
  };

  Switch = () => {
    const NormalStyle = {
      color: this.props.inMenu ? '#fff' : '#222',
    };
    const ActiveStyle = {
      background: this.props.inMenu ? '#fff' : '#222',
      color: this.props.inMenu ? '#222' : '#fff',
    };
    return (
      <SwitchView style={NormalStyle}>
        <SwitchBtn style={this.state.switch ? ActiveStyle : null} onClick={this.SwitchOn}>
          ON
        </SwitchBtn>
        {`/`}
        <SwitchBtn style={!this.state.switch ? ActiveStyle : null} onClick={this.SwitchOff}>
          OFF
        </SwitchBtn>
      </SwitchView>
    );
  };

  Main = () => (
    <View.Mask>
      <Container type="alpha" duration={5000}>
        <this.SiteName key="sitename" />
        <this.Switch key="switch" />
      </Container>
    </View.Mask>
  );

  Media = () => [
    <MediaQuery key="desktop" minWidth={Style.screen.M}>
      <this.Main />
    </MediaQuery>,
    <MediaQuery key="mobile" maxWidth={Style.screen.M}>
      <ScrollToHide key="switch" fixPos>
        <this.Main />
      </ScrollToHide>
    </MediaQuery>,
  ];

  render() {
    const { minWidth = 0 } = this.props;

    return (
      <MediaQuery minWidth={minWidth}>
        <this.Media />
      </MediaQuery>
    );
  }

  SwitchOn = () => {
    this.setState({ switch: true });
    window.localStorage.music = true;
    document.getElementById('music').play();
  };

  SwitchOff = () => {
    this.setState({ switch: false });
    window.localStorage.music = false;
    document.getElementById('music').pause();
  };
}

MusicSwitch.propTypes = {
  minWidth: PropTypes.number,
  inMenu: PropTypes.bool,
};

export default MusicSwitch;
