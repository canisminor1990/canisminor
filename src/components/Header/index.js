import { Style, View, Tabs, MobileTabs } from '../index';
import styled, { css } from 'styled-components';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const HeaderHeight = css`
  height: ${Style.headerHeight.XL}rem;
  @media ${Style.media('L')} {
    height: ${Style.headerHeight.L}rem;
  }
  @media ${Style.media('M')} {
    height: ${Style.headerHeight.M}rem;
  }
  @media ${Style.media('S')} {
    height: ${Style.headerHeight.S}rem;
  }
`;

const PlaceHoder = styled.div`
  ${HeaderHeight};
`;

const HeadView = styled(View)`
  position: absolute;
  user-select: none;
  transition: all 0.5s ease;
  z-index: ${Style.zIndex.header};
  ${HeaderHeight};
`;

const Inner = css`
  display: flex;
  padding: 0 6rem;
  align-items: center;
  justify-content: space-between;
  @media ${Style.media('XXL')} {
    padding: 0 5rem;
  }
  @media ${Style.media('XL')} {
    padding: 0 4rem;
  }
  @media ${Style.media('L')} {
    padding: 0 3rem;
  }
  @media ${Style.media('S')} {
    padding: 0 1.5rem;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const Header = ({ tabs = {} }) => {
  const activeTab = location.pathname.split('/')[1] || 'hola';
  return [
    <MediaQuery key="desktop" minWidth={Style.screen.M}>
      <HeadView css={Inner} type="top" fullscreen>
        <Tabs tabs={tabs} activeTab={activeTab} />
      </HeadView>
    </MediaQuery>,
    <MediaQuery key="mobile" maxWidth={Style.screen.M}>
      <HeadView css={Inner}>
        <MobileTabs tabs={tabs} activeTab={activeTab} />
      </HeadView>
    </MediaQuery>,
  ];
};

Header.PlaceHolder = () => <PlaceHoder />;

Header.propTypes = {
  tabs: PropTypes.object,
};

export default Header;
