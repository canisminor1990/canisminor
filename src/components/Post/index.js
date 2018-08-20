import styled from 'styled-components';
import { Style, Image } from '../index';
import MediaQuery from 'react-responsive';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Padding = {
  L: 1.5,
  M: 1,
};

const BasePost = styled(Link)`
  margin: 0 ${Padding.L}rem 6rem;
  position: relative;
  cursor: pointer;
  @media ${Style.media('M')} {
    margin: 0 ${Padding.M}rem 4rem;
  }
`;

const SquarePost = BasePost.extend`
  width: calc((100% - ${Padding.L * 6}rem) / 3);
  @media ${Style.media('M')} {
    width: calc((100% - ${Padding.M * 4}rem) / 2);
  }
  @media ${Style.media('S')} {
    width: 100%;
  }
`;

const WidePost = BasePost.extend`
  width: calc(100% - ${Padding.L * 2}rem);
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
  @media ${Style.media('M')} {
    flex-direction: column;
    padding-bottom: 0;
    width: calc(100% - ${Padding.M * 2}rem);
  }
`;

const BaseCase = styled.div`
  position: relative;
  display: table;
  height: 0;
`;

const SquareCase = BaseCase.extend`
  width: 100%;
  padding-top: 100%;
`;

const ImgCase = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const WideCase = BaseCase.extend`
  width: calc((100% - ${Padding.L * 4}rem) / 3 * 2 + ${Padding.L * 2}rem);
  min-width: calc((100% - ${Padding.L * 4}rem) / 3 * 2 + ${Padding.L * 2}rem);
  margin: 0 ${Padding.L * 2}rem 0 0;
  ${ImgCase} {
    position: relative;
  }
  @media ${Style.media('M')} {
    margin: 0;
    width: 100%;
  }
`;

const Content = styled.section`
  margin: 2rem 0;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  ${Style.fontSize(2.5, true)};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 500;
  margin-bottom: 1rem;
  @media ${Style.media('S')} {
    ${Style.fontSize(1.5, true)};
  }
`;

const Tag = styled.div`
  ${Style.fontSize(0)};
  text-align: center;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 0.08em;
  position: relative;
  &:before {
    position: absolute;
    content: '';
    background: #222;
    display: block;
    width: 100%;
    height: 1px;
    transition: all 0.5s ${Style.ease.normal};
    bottom: -0.5rem;
  }
  ${Content}:hover & {
    &:before {
      background: ${Style.color.goldDark};
      width: 2rem;
    }
  }
`;

const Desc = styled.div`
  ${Style.fontSize(1, true)};
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CoverBase = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  transition: all 0.5s ${Style.ease.normal};

  > span {
    width: 100%;
    height: 100%;
    transition: transform 0.5s ${Style.ease.normal};
  }
  &:hover {
    border-radius: 10%;
    box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.2);
  }
`;

const CoverBoxS = CoverBase.extend`
  filter: brightness(90%) contrast(120%) grayscale(100%);
  &:hover {
    filter: brightness(100%) contrast(100%) grayscale(0%);
    > span {
      transform: scale(1.04);
    }
  }
`;

const CoverBoxM = CoverBase.extend`
  &:hover {
    > span {
      transform: scale(1.02);
    }
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const Post = ({ content, wide = false }) => {
  const View = wide ? WidePost : SquarePost;
  const Showcase = wide ? WideCase : SquareCase;

  const coverS = content.cover.s ? content.cover.s : content.cover.l + '!s';
  const coverM = content.cover.m ? content.cover.m : content.cover.l + '!m';

  const CoverBox = wide ? CoverBoxM : CoverBoxS;

  return (
    <View to={`/blog/posts/${content.filename}`}>
      <Showcase>
        <ImgCase>
          <MediaQuery minWidth={Style.screen.S}>
            <CoverBox>
              <Image src={wide ? coverM : coverS} grey />
            </CoverBox>
          </MediaQuery>
          <MediaQuery maxWidth={Style.screen.S}>
            <Image src={coverS} grey />
          </MediaQuery>
        </ImgCase>
      </Showcase>
      <Content>
        <Title>{content.title}</Title>
        <Tag>{content.tag.toUpperCase()}</Tag>
        <Desc>{content.desc}</Desc>
      </Content>
    </View>
  );
};

Post.propTypes = {
  content: PropTypes.object,
  wide: PropTypes.bool,
};

export default Post;
