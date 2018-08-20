import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as focusManager from '../../utils/focusManager';
import scopeTab from '../../utils/scopeTab';
import * as ariaAppHider from '../../utils/ariaAppHider';
import * as classList from '../../utils/classList';
import SafeHTMLElement from '../../utils/safeHTMLElement';
import Motion from '../Motion';
import { Button, Style } from '../';

const ModalOverlay = styled(Motion)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.div`
  box-shadow: 0 0.25rem 2rem rgba(0, 0, 0, 0.1);
  background: #fff;
  overflow: auto;
  border-radius: 0.25rem;
  outline: none;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;
  > button {
    width: 100%;
  }
`;

const Title = styled.div`
  font-weight: 600;
  ${Style.fontSize(3)};
  line-height: 2;
  text-align: center;
`;

const Content = styled.div`
  ${Style.fontSize(0, true)};
  margin: 1rem 0 2rem;
  text-align: center;
`;

// so that our CSS is statically analyzable
const TAB_KEY = 9;
const ESC_KEY = 27;

let ariaHiddenInstances = 0;

export default class ModalPortal extends Component {
  static defaultProps = {
    style: {
      overlay: {},
      content: {},
    },
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    style: PropTypes.shape({
      content: PropTypes.object,
      overlay: PropTypes.object,
    }),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    overlayClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    bodyOpenClassName: PropTypes.string,
    htmlOpenClassName: PropTypes.string,
    ariaHideApp: PropTypes.bool,
    appElement: PropTypes.instanceOf(SafeHTMLElement),
    onAfterOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    closeTimeoutMS: PropTypes.number,
    shouldFocusAfterRender: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
    shouldReturnFocusAfterClose: PropTypes.bool,
    role: PropTypes.string,
    contentLabel: PropTypes.string,
    aria: PropTypes.object,
    data: PropTypes.object,
    children: PropTypes.node,
    shouldCloseOnEsc: PropTypes.bool,
    overlayRef: PropTypes.func,
    contentRef: PropTypes.func,
    testId: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      afterOpen: false,
      beforeClose: false,
    };

    this.shouldClose = null;
    this.moveFromContentToOverlay = null;
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (process.env.NODE_ENV !== 'production') {
      if (prevProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
        // eslint-disable-next-line no-console
        console.warn(
          'React-Modal: "bodyOpenClassName" prop has been modified. ' +
            'This may cause unexpected behavior when multiple modals are open.'
        );
      }
      if (prevProps.htmlOpenClassName !== this.props.htmlOpenClassName) {
        // eslint-disable-next-line no-console
        console.warn(
          'React-Modal: "htmlOpenClassName" prop has been modified. ' +
            'This may cause unexpected behavior when multiple modals are open.'
        );
      }
    }

    if (this.props.isOpen && !prevProps.isOpen) {
      this.open();
    } else if (!this.props.isOpen && prevProps.isOpen) {
      this.close();
    }
  }

  componentWillUnmount() {
    this.afterClose();
    clearTimeout(this.closeTimer);
  }

  setOverlayRef = overlay => {
    this.overlay = overlay;
    this.props.overlayRef && this.props.overlayRef(overlay);
  };

  setContentRef = content => {
    this.content = content;
    this.props.contentRef && this.props.contentRef(content);
  };

  beforeOpen() {
    const { appElement, ariaHideApp, htmlOpenClassName, bodyOpenClassName } = this.props;

    // Add classes.
    classList.add(document.body, bodyOpenClassName);

    htmlOpenClassName && classList.add(document.getElementsByTagName('html')[0], htmlOpenClassName);

    if (ariaHideApp) {
      ariaHiddenInstances += 1;
      ariaAppHider.hide(appElement);
    }
  }

  afterClose = () => {
    const { appElement, ariaHideApp, htmlOpenClassName, bodyOpenClassName } = this.props;

    // Remove classes.
    classList.remove(document.body, bodyOpenClassName);

    htmlOpenClassName &&
      classList.remove(document.getElementsByTagName('html')[0], htmlOpenClassName);

    // Reset aria-hidden attribute if all modals have been removed
    if (ariaHideApp && ariaHiddenInstances > 0) {
      ariaHiddenInstances -= 1;

      if (ariaHiddenInstances === 0) {
        ariaAppHider.show(appElement);
      }
    }

    if (this.props.shouldFocusAfterRender) {
      if (this.props.shouldReturnFocusAfterClose) {
        focusManager.returnFocus();
        focusManager.teardownScopedFocus();
      } else {
        focusManager.popWithoutFocus();
      }
    }
  };

  open = () => {
    this.beforeOpen();
    if (this.state.afterOpen && this.state.beforeClose) {
      clearTimeout(this.closeTimer);
      this.setState({ beforeClose: false });
    } else {
      if (this.props.shouldFocusAfterRender) {
        focusManager.setupScopedFocus(this.node);
        focusManager.markForFocusLater();
      }

      this.setState({ isOpen: true }, () => {
        this.setState({ afterOpen: true });

        if (this.props.isOpen && this.props.onAfterOpen) {
          this.props.onAfterOpen();
        }
      });
    }
  };

  close = () => {
    if (this.props.closeTimeoutMS > 0) {
      this.closeWithTimeout();
    } else {
      this.closeWithoutTimeout();
    }
  };

  // Don't steal focus from inner elements

  closeWithTimeout = () => {
    const closesAt = Date.now() + this.props.closeTimeoutMS;
    this.setState({ beforeClose: true, closesAt }, () => {
      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.state.closesAt - Date.now());
    });
  };

  closeWithoutTimeout = () => {
    this.setState(
      {
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null,
      },
      this.afterClose
    );
  };

  handleKeyDown = event => {
    if (event.keyCode === TAB_KEY) {
      scopeTab(this.content, event);
    }

    if (this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
      event.stopPropagation();
      this.requestClose(event);
    }
  };

  handleOverlayOnClick = event => {
    if (this.shouldClose === null) {
      this.shouldClose = true;
    }

    if (this.shouldClose && this.props.shouldCloseOnOverlayClick) {
      if (this.ownerHandlesClose()) {
        this.requestClose(event);
      }
    }
    this.shouldClose = null;
  };

  handleContentOnMouseUp = () => {
    this.shouldClose = false;
  };

  handleOverlayOnMouseDown = event => {
    if (!this.props.shouldCloseOnOverlayClick && event.target === this.overlay) {
      event.preventDefault();
    }
  };

  handleContentOnClick = () => {
    this.shouldClose = false;
  };

  handleContentOnMouseDown = () => {
    this.shouldClose = false;
  };

  requestClose = event => this.ownerHandlesClose() && this.props.onRequestClose(event);

  ownerHandlesClose = () => this.props.onRequestClose;

  shouldBeClosed = () => !this.state.isOpen && !this.state.beforeClose;

  attributesFromObject = (prefix, items) =>
    Object.keys(items).reduce((acc, name) => {
      acc[`${prefix}-${name}`] = items[name];
      return acc;
    }, {});

  render() {
    const { title = 'title', button = 'close', role, contentLabel, children } = this.props;

    return this.shouldBeClosed() ? null : (
      <ModalOverlay
        type="scale"
        duration={400}
        ref={this.setOverlayRef}
        style={this.props.style.overlay}
        onClick={this.handleOverlayOnClick}
        onMouseDown={this.handleOverlayOnMouseDown}
      >
        <ModalContent
          key="content"
          ref={this.setContentRef}
          tabIndex="-1"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleContentOnMouseDown}
          onMouseUp={this.handleContentOnMouseUp}
          onClick={this.handleContentOnClick}
          role={role}
          aria-label={contentLabel}
          {...this.attributesFromObject('aria', this.props.aria || {})}
          {...this.attributesFromObject('data', this.props.data || {})}
        >
          <Title>{title}</Title>
          <Content>{children}</Content>
          <Button onClick={this.props.onRequestClose}>{button}</Button>
        </ModalContent>
      </ModalOverlay>
    );
  }
}
