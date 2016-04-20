import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

export default class App extends Component {
  render() {
    return (
      <div id='App'>
        App
        <Header />
        <Footer />
        <Content />
      </div>
    )
  }
}

render(<App />, document.getElementById('main-container'));
