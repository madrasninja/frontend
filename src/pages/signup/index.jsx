import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import SignupForm from './form';

import API_CALL from '../../services';

import './style.scss';
import Notifier from '../../components/notifier';

export default class Signup extends Component {
	state = {
		notifier: false,
		color: 'primary',
		message: '',
		success: false
	};

	apicall = (values) => {
		API_CALL('post', 'signup', values, null, (data) => {
			const { code, message } = data;
			if (code == 'MNS008') {
				this.setState({
					notifier: true,
					color: 'info',
					message:
						'Hey ' +
						values.First_Name +
						', you are already entitled. We have emailed you the link, can setup password there.'
				});
			} else if (code == 'MNS009') {
				this.setState({
					success: true
				});
			} else {
				this.setState({
					notifier: true,
					color: 'danger',
					message
				});
			}
		});
	};
	render() {
		const { notifier, color, message, success } = this.state;
		if (success) {
			return (
				<div className="login">
					<Row>
						<Col xs={12} className="text-center">
							<h3>You are almost done!</h3>
							<p className="text-black-50">Please verify your email & get ninjafied officially</p>
						</Col>
					</Row>
				</div>
			);
		} else {
			return (
				<div className="login">
					<Row>
						<Col xs={12} className="text-center">
							<h3 className="">Ready to get ninjafied</h3>
							<p className="text-black-50">One account for all the services</p>
						</Col>
						<Col xs={12} md={{ size: 4, offset: 4 }}>
							<SignupForm getValues={(data) => this.apicall(data)} />
							<Notifier show={notifier} color={color} message={message} />
						</Col>
						<Col xs={12} className="add-on text-center">
							Already have an account? <Link to="/signin">Signin</Link>
						</Col>
					</Row>
				</div>
			);
		}
	}
}
