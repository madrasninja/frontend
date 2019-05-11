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
			assigned: false
		}
	}

	componentWillMount() {
		const { getLabourForBooking, bookingId } = this.props;

		getLabourForBooking(bookingId);
	}

	handleBtnOnclick = (Labour_ID, btnIndex) => {
		this.setState({ Labour_ID, btnIndex, disabled: false })
	}

	renderAssignLabour = () => {
		const { labourListForBooking: { data } } = this.props;
		const { btnIndex } = this.state;

		let labourList = data.length !== 0 ?
			_.map(data, (response, index) => {
				const { avatar, First_Name, Last_Name, Email_Id, _id } = response;

				return (
					<ListGroupItem key={index} className="labourlist-styling">
						<Row>
							<Col md={2} sm={2}>
								<img src={avatar ? avatar : defaultUser} height="60" width="60" className="rounded-circle" />
							</Col>

							<Col md={7} sm={7}>
								<span>
									<h6 className="mb-0 mt-2">{`${First_Name} ${Last_Name}`}</h6>
									<p className="text-muted">{Email_Id}</p>
								</span>
							</Col>

							<Col md={3} sm={3} className="text-right">
								<Button outline={btnIndex === index ? false : true} color="secondary" className="mt-3" size="sm" onClick={() => this.handleBtnOnclick(_id, index)}><i className="fa fa-check" /></Button>
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
		const { bookingId, getBookingList } = this.props;
		const { Labour_ID } = this.state;

		let reqInput = {
			Booking_ID: bookingId,
			Labour_ID
		}


		this.setState({ spinners: true })
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

	render() {
		const { labourListForBooking: { requesting } } = this.props;
		const { spinners, disabled, alertMessageToggle, alertMessage, visible, assigned } = this.state;

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
									<Button disabled={disabled} color="primary" size='sm' onClick={this.submitForm}>Submit</Button>
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
