import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import API_CALL from '../../services';

import './style.scss';

export default class PaymentPage extends Component {
	state = {
		Booking_ID: this.props.match.params.id,
		handler: {
			pass: (data) => {
				console.log(data);
			},
			fail: (data) => {
				console.log(data);
			}
		}
	};

	componentDidMount = () => {
		const { Booking_ID, handler } = this.state;
		API_CALL('post', 'getpaymenthash', { Booking_ID }, null, (response) => {
			const { code, data } = response;
			if (code == 'MNS020') {
				bolt.launch(data, handler);
			}
		});
	};

	render() {
		return (
			<div className="payment">
				<div className="header">Payment Phase</div>
			</div>
		);
	}
}
