import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

export class Providers extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          {this.props.children}
        </BrowserRouter> 
      </Provider>
    );
  }
}