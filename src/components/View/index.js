import { Style } from '../index';
import styled, { css } from 'styled-components';
import Motion from '../Motion';
import PropTypes from 'prop-types';
import _ from 'lodash';
/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Outter = styled.div`
  width: 100%;
  position: relative;
`;

const Content = css`
  height: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  width: 100%;
  @media ${Style.media('L')} {
    max-width: 1024px;
    padding: 0 1rem;
  }
  @media ${Style.media('S')} {
    padding: 0;
  }
  ${props => props.css};
`;

const MotionContent = styled(Motion)`
  ${Content};
`;

const NormalContent = styled.section`
  ${Content};
`;

const Mask = styled.div`
  z-index: ${Style.zIndex.mask};
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  padding: 6rem;
  @media ${Style.media('XXL')} {
    padding: 5rem;
  }
  @media ${Style.media('XL')} {
    padding: 4.5rem;
  }
  @media ${Style.media('L')} {
    padding: 3.5rem;
  }
  @media ${Style.media('M')} {
    padding: 3rem;
  }
  @media ${Style.media('S')} {
    padding: 1.5rem;
  }
`;

const MaskContent = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  ${props => props.css};
`;

const Row = styled.div`
  display: flex;
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: center;
  min-height: 10rem;
  @media ${Style.media('M')} {
    align-items: center;
    flex-direction: column;
  }
`;

const LineText = styled.div`
  ${Style.fontSize(-2, true)};
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-top: -0.6rem;
  left: 0;
  > i {
    font-family: ${Style.fontFamily.times};
    background: #fff;
    padding: 0 1rem;
    color: #666;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const View = ({
  type,
  mode,
  delay,
  duration,
  interval,
  css = [],
  fullscreen = false,
  children,
  ...other
}) => {
  const FullscreenStyle = fullscreen ? null : { maxWidth: '1280px' };
  const Inner =
    type || mode ? (
      <MotionContent
        type={type}
        mode={mode}
        delay={delay}
        duration={duration}
        interval={interval}
        css={css}
        style={FullscreenStyle}
      >
        {children}
      </MotionContent>
    ) : (
      <NormalContent css={css} style={FullscreenStyle}>
        {children}
      </NormalContent>
    );

  return <Outter {...other}>{Inner}</Outter>;
};

View.propTypes = {
  css: PropTypes.array,
  animation: PropTypes.object,
  fullscreen: PropTypes.bool,
};

View.Mask = ({ css = [], children, ...other }) => {
  return (
    <Mask {...other}>
      <MaskContent css={css}>{children}</MaskContent>
    </Mask>
  );
};

View.Mask.propTypes = {
  css: PropTypes.array,
};

View.Row = ({ style = {}, line, text, align, children, ...other }) => {
  if (line)
    _.assign(style, {
      borderBottom: 'solid .5px rgba(0,0,0,.08)',
      paddingBottom: '6rem',
    });
  const Content = [
    <Row key="row" style={style} align={align} {...other}>
      {children}
    </Row>,
  ];
  if (text) {
    Content.push(
      <LineText key="text">
        <i>{text}</i>
      </LineText>
    );
  }

  return Content;
};

View.Row.propTypes = {
  line: PropTypes.bool,
  text: PropTypes.string,
  align: PropTypes.string,
};

export default View;
