import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-datetime/css/react-datetime.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'assets/common_styles/style.scss';
import Header from './src/components/header';
import Home from './src/pages/home/Home';
import Footer from './src/components/footer/Footer';
import OurServices from './src/pages/our-services/OurServices';
import Dashboard from './src/pages/dashboard/Dashboard';
import Book from './src/pages/book/Book';
import Labour from './src/pages/labour';
import Login from './src/pages/login';
import Signup from './src/pages/signup';
import BookSuccess from './src/pages/book/success';
import { getServiceTypeList } from './src/services/ServiceTypeList';
import { getLocalityList } from './src/services/LocalityList';
import { getMe } from './src/services/UserDetails';
import SetPassword from './src/pages/setpassword';
import ValidateUser from './src/pages/validateuser';
import User from './src/pages/user';

class App extends Component {
	constructor(props) {
		super(props);
		props.getServiceTypeList();
		props.getLocalityList();
		if (cookie.load('session')) {
			props.getMe();
		}
	}

	renderRoutes = () => {
		if (cookie.load('session')) {
			return (
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/services" component={OurServices} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/book" component={Book} />
					<Route path="/bookSuccess" component={BookSuccess} />
					<Route path="/labour" component={Labour} />
					<Route path="/user" component={User} />
					<Redirect to="/" />
				</Switch>
			);
		} else {
			return (
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/services" component={OurServices} />
					<Route path="/book" component={Book} />
					<Route path="/bookSuccess" component={BookSuccess} />
					<Route path="/signin" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/setPassword" component={SetPassword} />
					<Route path="/validateuser" component={ValidateUser} />
					<Redirect to="/" />
				</Switch>
			);
		}
	};

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header />
					<section className="container">{this.renderRoutes()}</section>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(
	(reduxData) => {
		return {
			userData: reduxData.UserDetails.data
		};
	},
	{
		getServiceTypeList,
		getLocalityList,
		getMe
	}
)(App);
