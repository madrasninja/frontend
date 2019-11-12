import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import arrivedNinja from '../../../assets/img/arrived-ninja.png';
import { clearServiceID } from '../../../services/BookService';

class BookSuccess extends Component {
	componentWillMount = () => {
		const { formResponse: { Booking_ID }, history } = this.props;
		if (!Booking_ID) {
			history.push({ pathname: '/book' });
		}
	};

	render() {
		const { Booking_ID } = this.props.formResponse;
		if (Booking_ID) {
			return (
				<Row className="book">
					<Col xs={12}>
						<h3 className="text-center heading">Service booked successfully!</h3>
					</Col>
					<Col xs={12}>
						<Row>
							<Col xs={12} className="text-center">
								<img src={arrivedNinja} alt="ninja" style={{ width: '20%' }} />
							</Col>
							<Col xs={12}>
								<h4 className="text-center font-weight-light">
									Here is your booking ID: <strong>{Booking_ID}</strong>. You can use this for furthur
									process.
								</h4>
							</Col>
							<Col xs={12} className="text-center mt-2">
								<h5 className="font-weight-light">
									Need another service? <br />
									<Link to="/book">
										<Button color="primary" className="mt-2">
											Book
										</Button>
									</Link>
								</h5>
							</Col>
						</Row>
					</Col>
				</Row>
			);
		} else {
			return null;
		}
	}
	componentWillUnmount() {
		this.props.clearServiceID();
	}
}

function mapStateToProps(reduxData) {
	return {
		formResponse: reduxData.BookService.data
	};
}

export default connect(mapStateToProps, { clearServiceID })(BookSuccess);
