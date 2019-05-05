import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
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
import API_CALL from '../../services';
import { getBookingList } from '../../services/BookingList';

@connect(null, { getBookingList })
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
		const { Status_ID } = data;
		const { User_Type } = this.props.userData;

		if (Status_ID == 0 || Status_ID == 1) {
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
		} else if (Status_ID == 2) {
			return (
				<Button color="success" size="sm" className="float-right">
					Assigned
				</Button>
			);
		} else if (Status_ID == 4) {
			return (
				<Button color="secondary" size="sm" className="float-right">
					Completed
				</Button>
			);
		} else if (Status_ID == 5) {
			return (
				<Button color="danger" size="sm" className="float-right">
					Cancelled
				</Button>
			);
		}
	};

	cancel = (data) => {
		const { ID } = data;
		API_CALL('get', `cancelbooking/${ID}`, null, null, (data) => {
			const { code, message } = data;
			if (code == 'MNS033') {
				this.props.getBookingList();
			}
		});
	};

	renderTitle = (data) => {
		if ([ 0, 1, 2, 3 ].indexOf(data.Status_ID) >= 0) {
			return (
				<Row>
					<Col xs={10}>
						{data.service_type.name} at {data.locality.name}
					</Col>
					<Col xs={2}>
						<UncontrolledDropdown>
							<DropdownToggle className="option" color="link">
								<i className="fa fa-ellipsis-v" />
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
			);
		} else {
			return (
				<Row>
					<Col xs={12}>
						{data.service_type.name} at {data.locality.name}
					</Col>
				</Row>
			);
		}
	};

	render() {
		const { bookingId } = this.state;
		const { data, userData: { User_Type } } = this.props;
		let hour = this.findDiff(data.Session_Time.From, data.Session_Time.To);
		return (
			<Col xs={12} sm={6} md={4}>
				<Card>
					<CardBody>
						<CardTitle>
							{this.renderTitle(data)}
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
						<div>
							<small className="text-black-50">Payment Status</small>
							<br />
							{data.Payment_Status == 0 ? 'Pending' : 'Success'}
							{data.Payment_Status == 0 && User_Type == 4 ? (
								<Link to={`/makepayment/${data.ID}`} className="float-right payment-link">
									Pay &#8377;200
								</Link>
							) : (
								''
							)}
						</div>
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
