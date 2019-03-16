import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Col, Card, CardBody, CardTitle, CardText, CardFooter, Button, Modal, ModalHeader } from 'reactstrap';

import AssignLabour from './assignLabour';

class BookingCard extends Component {
	state = {
		modal: false
	};

	findDiff = (from, to) => {
		return moment(to, 'DD/MM/YYYY HH:mm').diff(moment(from, 'DD/MM/YYYY HH:mm'), 'hours');
	};

	toggle = (data) => {
		this.setState({
			bookingId: data.ID,
			modal: !this.state.modal
		});
	};

	renderAction = (data) => {
		const { _id } = data.status;
		const { User_Type } = this.props.userData;

		if (_id == 0) {
			if (User_Type == 1 || User_Type == 2) {
				return (
					<Button color="primary" size="sm" className="float-right" onClick={() => this.toggle(data)}>
						Assign
					</Button>
				);
			} else {
				return (
					<Button color="primary" size="sm" className="float-right">
						New
					</Button>
				);
			}
		} else if (_id == 2) {
			return (
				<Button color="success" size="sm" className="float-right">
					Assigned
				</Button>
			);
		}
	};

	render() {
		const { bookingId } = this.state;
		const { data } = this.props;
		let hour = this.findDiff(data.Session_Time.From, data.Session_Time.To);
		return (
			<Col xs={12} sm={6} md={4}>
				<Card>
					<CardBody>
						<CardTitle>
							{data.service_type.name} at {data.locality.name}
							<br />
							<small>
								{moment(data.Session_Time.From, 'DD/MM/YYYY HH:mm').format('hh:mmA DD/MM/YYYY')} -{' '}
								{hour} {hour > 1 ? 'Hours' : 'Hour'}
							</small>
						</CardTitle>
						<CardText className="text-black-50">
							<span className="text-capitalize">
								{data.user.First_Name} {data.user.Last_Name}
							</span>
							<br />
							<small>
								{data.Address}
								<br />
								{data.user.Mobile_Number}
							</small>
						</CardText>
					</CardBody>
					<CardFooter>
						{data.ID}
						{this.renderAction(data)}
					</CardFooter>
				</Card>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Assign Labour</ModalHeader>
					<AssignLabour bookingId={bookingId} />
				</Modal>
			</Col>
		);
	}
}

export default connect((reduxData) => {
	return {
		userData: reduxData.UserDetails.data
	};
}, {})(BookingCard);
