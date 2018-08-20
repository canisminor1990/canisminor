import { View, Style, Icon } from '../index';
import styled, { css } from 'styled-components';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Copyright = styled.div`
  text-align: center;
  ${Style.fontSize(-1)};
  margin-top: 1.5rem;
  letter-spacing: 0.06em;
  @media ${Style.media('M')} {
    ${Style.fontSize(-2)};
  }
`;

const Inner = css`
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #888;
`;

const Social = styled.div`
  margin-top: 2rem;
  i {
    font-size: 2rem;
    margin: 0.5rem;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////
const SocialIcon = ({ type, href }) => {
  return (
    <a href={href}>
      <Icon type={type} />
    </a>
  );
};

export default ({ data, ...other }) => {
  const mapFooter = (item, i) => <SocialIcon key={i} type={item.type} href={item.href} />;

  return (
    <View css={Inner} key="footer" style={{ background: '#fff' }} {...other}>
      <Icon size={1.5} type="logo-text" />
      <Copyright>
        Copyright © 1990-
        {new Date().getFullYear()} CanisMinor. 京ICP备16055942号
      </Copyright>
      <Social>{data.map(mapFooter)}</Social>
    </View>
  );
};
