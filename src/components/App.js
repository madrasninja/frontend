import React, { Component } from 'react';

import './App.css';
import Header from './header/Header';
import Home from './home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <section className="container">
          <Home/>
        </section>
      </div>
    );
  }
}

export default App;
