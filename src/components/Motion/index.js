import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  static propTypes = {
    mode: PropTypes.string,
  };

  render() {
    const { mode = 'queue', children, ...other } = this.props;
    switch (mode) {
      case 'one':
        const { type = 'right', animation = {}, duration, delay, ...oneProps } = other;
        if (duration) animation.duration = duration;
        if (type) {
          _.defaults(animation, {
            type: 'from',
            opacity: 0,
            delay: delay,
          });
          switch (type) {
            case 'alpha':
              break;
            case 'left':
              animation.x = '-2rem';
              break;
            case 'right':
              animation.x = '2rem';
              break;
            case 'top':
              animation.y = '-2rem';
              break;
            case 'bottom':
              animation.y = '2rem';
              break;
            default:
              break;
          }
        }
        return (
          <TweenOne type={type} animation={animation} {...oneProps}>
            {children}
          </TweenOne>
        );
      case 'scroll':
        return <OverPack {...other}>{children}</OverPack>;
      case 'lazyScroll':
        const { playScale = 0.3, ...queueProps } = other;
        _.defaults(queueProps, {
          type: 'bottom',
          duration: 1000,
          interval: 100,
        });
        return (
          <OverPack playScale={playScale} always={false} style={{ minHeight: '10rem' }}>
            <QueueAnim key="anim" type={type} {...queueProps}>
              {children}
            </QueueAnim>
          </OverPack>
        );
      default:
        return <QueueAnim {...other}>{children}</QueueAnim>;
    }
  }
}
