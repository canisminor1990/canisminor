import { Component } from 'react';
import { View, Style, Post, Button, Loading, Motion, Header, MusicSwitch } from '../../components';
import styled from 'styled-components';
import { connect } from 'dva';
import _ from 'lodash';
import setTitle from '../../utils/setTitle';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const List = styled(Motion)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
`;

const Page = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    ...state.blog,
  };
};

const Dispatch = dispatch => ({
  getPage(page) {
    dispatch({ type: `blog/get`, payload: page });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Articles extends Component {
  state = {
    showButton: true,
    page: 1,
  };

  componentDidMount() {
    setTitle('Blog');
    this.props.getPage(1);
  }

  List = ({ page, content = { posts: [], more: false } }) => {
    const loading = this.state.loading;
    if (loading) return <Loading />;
    const first = page === 1;
    return (
      <Page>
        <List duration={500} interval={200}>
          {content.toc.map((post, i) => (
            <Post key={i} wide={first && i === 0} content={post} />
          ))}
        </List>
        {content.pages > content.page ? <this.More page={page + 1} /> : null}
      </Page>
    );
  };

  More = ({ page }) => {
    if (this.state.page < page)
      return <Button onClick={() => this.handleClick(page)}>More Articles</Button>;
    return _.isUndefined(this.props[page]) ? (
      <Loading height="30vh" />
    ) : (
      <this.List page={page} content={this.props[page]} />
    );
  };

  render() {
    return [
      <Header.PlaceHolder key="header" />,
      <MusicSwitch key="switch" minWidth={Style.screen.XL} />,
      <View key="view">
        {_.isUndefined(this.props[1]) ? (
          <Loading height="50vh" />
        ) : (
          <this.List page={1} content={this.props[1]} />
        )}
      </View>,
    ];
  }

  handleClick = page => {
    this.props.getPage(page);
    this.setState({ page: page });
  };
}

export default connect(
  State,
  Dispatch
)(Articles);
