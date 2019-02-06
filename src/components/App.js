import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import './App.css';
import Header from './header/Header';
import Home from './home/Home';
import Footer from './footer/Footer';
import OurServices from './our-services/OurServices';
import Dashboard from './dashboard/Dashboard';
import Book from './book/Book';
import { getServiceTypeList } from "./../services/ServiceTypeList";
import { getLocalityList } from "./../services/LocalityList";

class App extends Component {
  constructor(props) {
    super(props);
    props.getServiceTypeList();
    props.getLocalityList();
  }
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Header/>
            <section className="container">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/services' component={OurServices} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/book' component={Book} />
              <Redirect to='/' />
            </Switch>
            </section>
            <Footer/>
          </div>
        </BrowserRouter>
    );
  }
}

export default connect(null,{
  getServiceTypeList,
  getLocalityList
})(App);
