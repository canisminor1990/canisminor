import { Link } from 'dva/router';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Logo, Style } from '../index';
import Motion from '../Motion';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Tab = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  ${Style.hover.outter} > span,div {
    ${Style.hover.inner};
  }
  > span {
    display: block;
    ${Style.fontSize(-1)};
    margin-right: 0.5rem;
  }
  > div {
    font-weight: 600;
    letter-spacing: 0.05em;
    ${Style.fontSize(0)};
  }
  &:before {
    position: absolute;
    content: '';
    background: ${props => (props.active === 'true' ? '#222' : 'transparent')};
    display: block;
    width: 100%;
    height: 2px;
    z-index: -1;
    transition: all 1s ${Style.ease.normal};
    bottom: -0.25rem;
    left: 0;
  }
  &:hover {
    &:before {
      background: ${Style.color.goldDark};
      width: 2rem;
    }
  }
`;

const View = styled(Motion)`
  display: flex;
  flex-direction: row-reverse;
  a + a {
    margin-right: 2.5rem;
  }
  @media ${Style.media('L')} {
    ${Style.fontSize(-1)};
    a + a {
      margin-right: 1.5rem;
    }
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const Tabs = ({ tabs = {}, activeTab = '' }) => {
  const MapTabs = [];
  let i = _.size(tabs) + 1;
  _.forEach(Object.keys(tabs).reverse(), key => {
    const title = _.upperCase(key);
    const num = i-- < 10 ? `0${i}` : i;
    MapTabs.push(
      <Tab key={key} title={title} num={num} active={(key === activeTab).toString()} to={tabs[key]}>
        <span>{num}</span>
        <div>{title}</div>
      </Tab>
    );
  });
  return [
    <Link key="logo" to="/">
      <Logo size={2} hover />
    </Link>,
    <View key="tabs" delay={500} type={'bottom'}>
      {MapTabs}
    </View>,
  ];
};

Tabs.propTypes = {
  tabs: PropTypes.object,
  activeTab: PropTypes.string,
};

export default Tabs;
