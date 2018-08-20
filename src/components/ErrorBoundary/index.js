import { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: error });
    console.table(info.componentStack.split(/\n/g));
  }

  render() {
    if (this.state.hasError) return <div>${this.state.hasError}</div>;
    return this.props.children;
  }
}
