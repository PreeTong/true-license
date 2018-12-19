import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Routing from './routes'
// import Home from '../src/pages/Home'
import withNavbar from '../src/hdc/withNavbar'

class App extends Component {
  render() {
    return (
      <Routing  />
      // <Home />
    );
  }
}

export default withNavbar(App);