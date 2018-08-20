import styled from 'styled-components';
import { rgba } from 'polished';
import { Icon, Style } from '../';
import PropTypes from 'prop-types';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.div`
  color: transparent;
  display: flex;
  position: relative;
  height: ${props => props.size}rem;
  width: ${props => 2 * props.size}rem;
`;

const HoverView = View.extend`
  > div {
    transition: all 0.5s ${Style.ease.normal};
  }
  > .logoHover {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-text-stroke: 1px ${Style.color.goldDark};
  }
  &:hover {
    > .logoNormal {
      opacity: 0;
      transform: translate3d(-0.5rem, 0, 0);
    }
    > .logoHover {
      opacity: 1;
    }
  }
`;

const ShadowGroup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  > i {
    &:nth-child(1) {
      background: linear-gradient(
        -90deg,
        ${props => rgba('#000', props.alpha)} 0%,
        transparent 30%
      );
      -webkit-background-clip: text;
    }
    &:nth-child(2) {
      background: linear-gradient(
        -90deg,
        ${props => rgba('#000', props.alpha)} 0%,
        transparent 40%
      );
      -webkit-background-clip: text;
      margin-left: -${props => props.size / 2}rem;
    }
  }
`;
const LogoGroup = styled.div`
  > i {
    background: ${props => props.color};
    -webkit-background-clip: text;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const Logo = ({ size = 4, color = ['#222', '#555'], alpha = 0.5, hover = false, ...other }) => {
  const L = [
    <ShadowGroup key="shadow" alpha={alpha} size={size}>
      <Icon type="logo-shadow-1" size={size} />
      <Icon type="logo-shadow-2" size={size} />
    </ShadowGroup>,
    <LogoGroup
      key="logo"
      color={color.length > 1 ? `linear-gradient(45deg, ${color[0]}, ${color[1]})` : color}
    >
      <Icon type="logo" size={size} />
    </LogoGroup>,
  ];

  return hover ? (
    <HoverView size={size} {...other}>
      <div className="logoNormal">{L}</div>
      <div className="logoHover">
        <Icon type="logo" size={size} />
      </div>
    </HoverView>
  ) : (
    <View size={size} {...other}>
      {L}
    </View>
  );
};

Logo.propTypes = {
  size: PropTypes.number,
  color: PropTypes.array,
  alpha: PropTypes.number,
  hover: PropTypes.bool,
};

export default Logo;
