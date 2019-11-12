import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';
import { clearNotification, popNotification, setTimer } from '../../services/NotificationService';

/*Usage

Add this component in the Main component with configuration if needed
wherever it is needed, have to import addNotificaion action from the Notification Service
then pass message object as below
	{
		title: title of the message,
		message: your custom message,
		color: "bg-primary/bg-danger/bg-warning"
	}
*/

@connect(
	(reduxData) => {
		return {
			notifications: reduxData.Notification.data
		};
	},
	{ clearNotification, popNotification, setTimer },
	null,
	{ pure: false }
)
export default class PushNotificaton extends Component {
	static defaultProps = {
		timeout: 5000,
		animation: 'bounceIn',
		color: 'bg-primary'
	};
	renderCards = (data) => {
		return data.map((a, index) => {
			if (!a.timer) {
				this.props.setTimer(a);
				setTimeout(() => {
					this.props.popNotification(a);
				}, this.props.timeout);
			}
			return (
				<div
					className={`card-block ${a.color ? a.color : this.props.color} ${this.props.animation}`}
					key={index}
				>
					<div className="title p-2">{a.title}</div>
					<div className="body p-2">{a.message}</div>
				</div>
			);
		});
	};

	render() {
		return <div className="push-notification">{this.renderCards(this.props.notifications)}</div>;
	}
}
