import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

import ForgotPasswordForm from './form';

import API_CALL from '../../services';

import './style.scss';
import Notifier from '../../components/notifier';

export default class ForgotPassword extends Component {
	state = {
		color: 'primary',
		message: '',
		notifier: false
	};

	apicall = (data) => {
		API_CALL('post', 'forgetpassword', data, null, (data) => {
			const { code, message } = data;
			if (code == 'MNS029') {
				this.setState({
					color: 'success',
					message: message,
					notifier: true
				});
			} else {
				this.setState({
					color: 'danger',
					message: message,
					notifier: true
				});
			}
		});
	};
	render() {
		const { color, message, notifier } = this.state;
		return (
			<div className="login">
				<Row>
					<Col xs={12} className="text-center">
						<h3 className="">Forgot Your Password</h3>
						<p className="text-black-50">Submit your Email ID & reset the password</p>
					</Col>
					<Col xs={12} md={{ size: 4, offset: 4 }}>
						<ForgotPasswordForm getValues={(data) => this.apicall(data)} />
						<Notifier color={color} message={message} show={notifier} />
					</Col>
					<Col xs={12} className="add-on text-center">
						<h6>
							<Link to="/signin">Login</Link>
						</h6>
					</Col>
					<Col xs={12} className="add-on text-center">
						New to Madrasninja? <Link to="/signup">Join Now</Link>
					</Col>
				</Row>
			</div>
		);
	}
}
