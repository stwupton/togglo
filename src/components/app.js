import React from 'react';
import { connect } from 'react-redux';

import '../styles/app.scss'

class TestB extends React.Component {
  render() {
    console.log('B rendered');
    return (<div></div>);
  }
}

class TestA extends React.Component {
  render() {
    console.log('A rendered');
    return (<TestB></TestB>);
  }
}

class App extends React.Component {
  render() {
    console.log('App rendered', this.props);
    return (
      <div className="App">
        <h1>{this.props.count}</h1>
        <button onClick={() => {
          this.props.increment();
        }}>Test</button>
        <TestA></TestA>
      </div>
    );
  }
}

export default connect((state) => ({
  count: state.count
}), (dispatch) => ({
  increment: () => dispatch({type: 'increment'})
}))(App);