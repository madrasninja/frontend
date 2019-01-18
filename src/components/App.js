import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import Header from './header/Header';
import Home from './home/Home';
import Footer from './footer/Footer';
import OurServices from './our-services/OurServices';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Header/>
            <section className="container">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/services' component={OurServices} />
              <Redirect to='/' />
            </Switch>
            </section>
            <Footer/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
