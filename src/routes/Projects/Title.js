import styled from 'styled-components';
import { Icon, Style, Typist } from '../../components';

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 6rem;
  i {
    font-size: 6.5rem;
    line-height: 2;
    transition: font-size 0.3s ease;
    transition: all 0.5s ${Style.ease.normal};
    &:hover {
      color: transparent;
      -webkit-text-stroke: 0.5px #222;
    }
  }
  .Typist {
    font-size: 1.2rem;
    line-height: 1.5 !important;
    text-align: center;
    transition: font-size 0.3s ease;
    height: 3rem;
  }
  @media ${Style.media('M')} {
    margin-top: 3rem;
    br {
      display: none;
    }
    i {
      font-size: 11vw;
    }
    .Typist {
      ${Style.fontSize(0)};
      width: 70%;
    }
  }
  @media ${Style.media('S')} {
    .Typist {
      ${Style.fontSize(-1)};
    }
  }
`;

export default () => {
  return (
    <Title>
      <Icon type="project" />
      <Typist className="Typist">Selection of my recent works</Typist>
    </Title>
  );
};
