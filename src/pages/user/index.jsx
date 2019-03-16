import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Row, Col, Navbar, NavbarBrand } from 'reactstrap';

import UserHome from './home';
import './style.scss';

class User extends Component {
	render() {
		return (
			<Row className="user">
				<Col xs={12} className="header">
					<Navbar color="transparent" light expand="md">
						<Link to="/user/home">
							<NavbarBrand>User Management</NavbarBrand>
						</Link>
					</Navbar>
				</Col>
				<Col xs={12}>
					<Switch>
						<Route path="/user/home" component={UserHome} />
						<Redirect to="/user/home" />
					</Switch>
				</Col>
			</Row>
		);
	}
}

export default User;
