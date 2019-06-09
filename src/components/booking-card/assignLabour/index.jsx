import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	ListGroup, ListGroupItem, ModalBody,
	ModalFooter, Spinner, Button, Alert, Row, Col
} from 'reactstrap';

import { getLabourForBooking } from '../../../services/LabourListForBooking';
import { getBookingList } from '../../../services/BookingList/index';
import defaultUser from '../../../assets/img/user.svg';
import API_CALL from '../../../services';

import './style.scss';

class AssignLabour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spinners: false,
			visible: true,
			alertMessageToggle: false,
			alertMessage: {
				color: 'danger',
				message: 'oops something went wrong'
			},
			disabled: true,
			Labour_ID: '',
			btnIndex: null,
			assigned: false,
			Labour_ID: [],
			toggleAlert: false
		}
	}

	componentWillMount() {
		const { getLabourForBooking, bookingId } = this.props;

		getLabourForBooking(bookingId);
	}

	handleOnchange = (event, id) => {
		const { Labour_ID } = this.state;
		let checkedStatus = document.getElementById(`checkbox-${id}`).checked;

		checkedStatus ? this.state.Labour_ID.push(id) : _.remove(Labour_ID, num => num === id)
		Labour_ID.length === 0 ? this.setState({ disabled: true }) : this.setState({ disabled: false })
	}

	renderAssignLabour = () => {
		const { labourListForBooking: { data } } = this.props;

		let labourList = data.length !== 0 ?
			_.map(data, (response, index) => {
				const { avatar, First_Name, Last_Name, Email_Id, _id } = response;

				return (
					<ListGroupItem key={index} className="labourlist-styling">
						<Row>
							<Col md={2} sm={2}>
								<img src={avatar ? avatar : defaultUser} height="60" width="60" className="rounded-circle" />
							</Col>

							<Col md={10} sm={10}>
								<span className='d-inline-block'>
									<h6 className="mb-0 mt-2">{`${First_Name} ${Last_Name}`}</h6>
									<p className="text-muted">{Email_Id}</p>
								</span>

								<span className="Checkbox d-inline-block checkbox-wrap">
									<input type="checkbox" id={`checkbox-${_id}`} onChange={(e) => this.handleOnchange(e, _id, index)} />
									<div className="Checkbox-visible"></div>
								</span>
							</Col>
						</Row>
					</ListGroupItem>
				)
			}) : <div className='p-2'><Alert color="info">No labours to assign</Alert></div>

		return <ListGroup>{labourList}</ListGroup>
	}

	onDismiss = () => {
		this.setState({ visible: false });
	}

	submitForm = () => {
		const { bookingId, getBookingList, requiredStaffs } = this.props;
		const { Labour_ID } = this.state;

		let reqInput = {
			Booking_ID: bookingId,
			Labour_ID
		}

		// to check number of labours booked are not less than number of labours assigned
		if (Labour_ID.length === requiredStaffs) this.setState({ toggleAlert: true })
		else {
			this.setState({ spinners: true, toggleAlert: false })
			API_CALL('post', 'assignlabour', reqInput, null, response => {
				if (response.code == "MNS014") {
					this.setState({
						spinners: false,
						alertMessageToggle: true,
						alertMessage: { color: 'success', message: response.message, },
						assigned: true
					});
					getBookingList();
				} else this.setState({
					spinners: false,
					alertMessageToggle: true,
					alertMessage: { color: 'danger', message: response.message }
				});
			})
		}
	}

	render() {
		const { labourListForBooking: { requesting } } = this.props;
		const { spinners, disabled, alertMessageToggle, alertMessage, visible, assigned, toggleAlert } = this.state;

		if (requesting) return <ModalBody className='text-center'><Spinner color="primary" size="lg" /></ModalBody>
		else {
			return (
				<div>
					<ModalBody className="p-0">
						{this.renderAssignLabour()}
					</ModalBody>
					<ModalFooter>
						{alertMessageToggle ?
							<Alert
								isOpen={visible}
								toggle={this.onDismiss}
								color={alertMessage.color}
								className='alertWrap text-center'
							> {alertMessage.message}
							</Alert> : null
						}

						{
							spinners === true ?
								<Spinner color="primary" size="sm" />
								: assigned ?
									<Button color="success" size='sm' >Assigned</Button>
									:
									<span>
										{toggleAlert ? <Alert color='warning'>Number of labours assigning must be equal to number of labours booked</Alert> : null}
										<Button disabled={disabled} color="primary" size='sm' className='float-right' onClick={this.submitForm}>Submit</Button>
									</span>
						}
					</ModalFooter>
				</div>
			);
		}
	}
}

const mapStateToProps = ({ labourListForBooking }) => {
	return { labourListForBooking }
}

export default connect(mapStateToProps, { getLabourForBooking, getBookingList })(AssignLabour);
