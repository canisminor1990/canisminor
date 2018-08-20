import _ from 'lodash';
import { Component } from 'react';
import styled, { css } from 'styled-components';
import {
  View,
  Button,
  Style,
  Input,
  Header,
  MusicSwitch,
  Image,
  Modal,
  Loading,
} from '../../components';
import { connect } from 'dva';
import Title from './Title';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Inner = css`
  max-width: 1024px !important;
`;

const Row = styled.div`
  display: flex;
  padding: 0 6rem;
  @media ${Style.media('M')} {
    padding: 0 2rem;
  }
  @media ${Style.media('MS')} {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const Main = styled.div`
  flex: 1;
  width: 100%;
`;

const MainItem = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const MainTitle = styled.span`
  position: relative;
  &:before {
    position: absolute;
    content: '';
    background: transparent;
    display: block;
    width: 100%;
    height: 1px;
    z-index: -1;
    transition: all 0.8s ${Style.ease.normal};
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

const ContactIcon = styled(Image)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
`;

const Mail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 2;
  width: 100%;
  @media ${Style.media('S')} {
    align-items: center;
    button {
      width: 100%;
    }
  }
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    data: state.contact,
    loading: _.size(state.contact) === 0 || state.loading.models.contact,
    mail: state.mail,
    loadingMail: state.loading.global,
  };
};

const Dispatch = dispatch => ({
  getContact() {
    dispatch({ type: 'contact/get' });
  },
  sendMessage(content) {
    dispatch({ type: `mail/get`, payload: content });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Contact extends Component {
  componentDidMount() {
    setTitle('Contact');
    this.props.getContact();
  }

  state = {
    name: '',
    email: '',
    message: '',
    modal: {
      title: '',
      content: '',
      button: '',
    },
  };

  Main = () => {
    const mapMain = (item, i) => (
      <MainItem key={i} href={item.href}>
        <ContactIcon src={item.icon} />
        <MainTitle>{item.title}</MainTitle>
      </MainItem>
    );
    return <Main>{this.props.data.main.map(mapMain)}</Main>;
  };

  Mail = () => (
    <Mail>
      <Input placeholder="NANE" onChange={e => this.setState({ name: e.target.value })} />
      <Input placeholder="E-MAIL" onChange={e => this.setState({ email: e.target.value })} />
      <Input
        placeholder="MESSAGE"
        onChange={e => this.setState({ message: e.target.value })}
        textarea
      />
      <Button type="black" onClick={this.handleClick}>
        send message
      </Button>
    </Mail>
  );

  render() {
    return [
      <Header.PlaceHolder key="header" />,
      <MusicSwitch key="switch" minWidth={Style.screen.M} />,
      <View key="view" css={Inner} type="bottom" duration={1000} interval={500}>
        <Title key="title" />
        <Row key="row" align="flex-start">
          {this.props.loading ? <Loading /> : <this.Main />}
          <this.Mail />
        </Row>
      </View>,
      <Modal
        key="modal"
        ariaHideApp={false}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        title={this.state.modal.title}
        button={this.state.modal.button}
      >
        {this.state.modal.content}
      </Modal>,
    ];
  }

  handleClick = () => {
    if (this.state.name === '' || this.state.email === '' || this.state.message === '') {
      this.setState({
        modal: {
          title: 'Oops...',
          button: 'got it',
          content: 'The info or the message cannot be empty 😥',
        },
      });
      this.openModal();
      return;
    }
    this.props.sendMessage({
      subject: `${this.state.name} <${this.state.email}>`,
      text: this.state.message,
    });

    this.setState({
      modal: {
        title: 'Thank you',
        button: 'close',
        content: (
          <this.SendResult
            key={JSON.stringify(this.props.loading)}
            loading={this.props.loadingMail}
          />
        ),
      },
    });
    this.openModal();
  };

  SendResult = ({ loading }) => {
    const { mail } = this.props;
    if (loading || mail.id === '') return <Loading />;
    return (
      <div key={mail.id}>
        {mail.message === 'Queued. Thank you.'
          ? 'Message has be sent, thanks for your contact 😘'
          : mail.message}
      </div>
    );
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
}
export default connect(
  State,
  Dispatch
)(Contact);
