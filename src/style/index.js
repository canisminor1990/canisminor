import _ from 'lodash';
import { css, keyframes } from 'styled-components';
import { rem } from 'polished';

class Style {
  color = {
    C: 'rgb(0, 255, 255)',
    M: 'rgb(255, 0, 255)',
    Y: 'rgb(255, 255, 0)',
    R: 'rgb(255, 0, 0)',
    G: 'rgb(0, 255, 0)',
    B: 'rgb(0, 0, 255)',
    bg: '#fcfcfd',
    goldDark: '#9d8352',
    gold: '#bfa677',
    goldLight: '#e2ca9c',
  };

  gradient = {
    cmykRainbow: deg => this.linerGradient(deg, [this.color.C, this.color.Y, this.color.M]),
  };

  ease = {
    normal: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
  };

  duration = {
    menu: 200,
  };

  zIndex = {
    header: 10,
    menu: 20,
    mask: 5,
  };

  screen = {
    XXL: 1600,
    XL: 1300,
    L: 1080,
    M: 880,
    MS: 660,
    S: 440,
  };

  headerHeight = {
    XL: 12,
    L: 10,
    M: 8,
    S: 5,
  };

  fontFamily = {
    code: 'Hack, Menlo, Consolas, Courier, monospace !important',
    times: 'Times New Roman',
  };

  hover = {
    outter: css`
      perspective: 300px;
    `,
    inner: css`
      transformstyle: preserve-3d;
      transform: rotateY(0deg) translateZ(0);
      transform-origin: left center;
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      &:hover {
        transform: rotateY(10deg) translateZ(0);
      }
    `,
  };

  animation = {
    floatFront: keyframes`
  0% {
      transform: translate(0, 0);
    }

    14% {
      transform: translate(-6px, -16px);
    }

    25% {
      transform: translate(-3px, 3px);
    }

    37% {
      transform: translate(6px, -13px);
    }

    50% {
      transform: translate(2px, -4px);
    }

    63% {
      transform: translate(5px, -15px);
    }

    75% {
      transform: translate(2px, -6px);
    }

    88% {
      transform: translate(-4px, -15px);
    }

    100% {
      transform: translate(0, 0);
    }
`,

    floatBack: keyframes`
0% {
      transform: translate(0, 0);
    }

    14% {
      transform: translate(6px, -16px);
    }

    25% {
      transform: translate(3px, 3px);
    }

    37% {
      transform: translate(-3px, -13px);
    }

    50% {
      transform: translate(2px, -4px);
    }

    63% {
      transform: translate(-2px, -15px);
    }

    75% {
      transform: translate(2px, -6px);
    }

    88% {
      transform: translate(-4px, -15px);
    }

    100% {
      transform: translate(0, 0);
    }
`,
  };

  /// ////////////////////////////////////////////////////////////////////////
  // Mixin
  /// ////////////////////////////////////////////////////////////////////////

  screenCheck(size) {
    return document.body.clientWidth > this.screen[size];
  }

  media(size) {
    return `screen and (max-width: ${this.screen[size]}px)`;
  }

  linerGradient(deg = 45, color = []) {
    if (!_.isArray(color) || color.length < 2) return;
    const split = 100 / color.length;
    const gradient = [];
    let precent = 0;
    for (let i = 0; i < color.length; i++) {
      gradient.push(`${color[i]} ${precent}%`);
      precent += split;
    }
    return `linear-gradient(${deg}deg, ${gradient.join(',')})`;
  }

  fontSize(i, applyLineHeight = false) {
    const { fontSize, lineHeight } = this.calcFontSize(i);
    const f = rem(fontSize + 'px');
    const h = rem(lineHeight + 'px');
    return css`
      font-size: ${f};
      line-height: ${applyLineHeight ? h : 1};
    `;
  }

  calcFontSize(i) {
    const e = Math.E;
    const r = (Math.sqrt(5) - 1) / 2;
    const f = 16 * Math.pow(e, i / 5);

    let fontSize = i < 0 ? Math.ceil(f) : Math.floor(f);
    if (fontSize % 2 !== 0) fontSize--;

    const h = fontSize * (1 + r * Math.pow(e, -i / (i + 2)));
    let lineHeight = Math.round(h);

    if (i < 0) {
      lineHeight = fontSize + 8;
    } else {
      if (lineHeight % 2 !== 0) lineHeight - fontSize > 8 ? lineHeight-- : lineHeight++;
    }
    return { fontSize, lineHeight };
  }
}

export default new Style();
