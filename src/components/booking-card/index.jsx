import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	CardFooter,
	Button,
	Modal,
	ModalHeader,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

import AssignLabour from './assignLabour';

class BookingCard extends Component {
	state = {
		modal: false
	};

	findDiff = (from, to) => {
		return moment(to, 'YYYY-MM-DD HH:mm:ss').diff(moment(from, 'YYYY-MM-DD HH:mm:ss'), 'hours');
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

	cancel = (data) => {
		console.log(data);
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
							<Row>
								<Col xs={10}>
									{data.service_type.name} at {data.locality.name}
								</Col>
								<Col xs={2}>
									<UncontrolledDropdown>
										<DropdownToggle className="option" color="link">
											&#8285;
										</DropdownToggle>
										<DropdownMenu right>
											<DropdownItem
												onClick={() => {
													this.cancel(data);
												}}
											>
												Cancel
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								</Col>
							</Row>
							<small>
								{moment(data.Session_Time.From, 'YYYY-MM-DD HH:mm:ss').format('hh:mmA DD/MM/YYYY')} -{' '}
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
