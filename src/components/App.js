import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import Banner from './banner/Banner';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Banner/>
      </div>
    );
  }
}

export default App;
