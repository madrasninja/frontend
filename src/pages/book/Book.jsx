import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import standingNinja from './../../assets/img/standing-ninja.png';
import './Book.scss';
import ServiceForm from './form';
import { bookService } from './../../services/BookService';
import Notifier from '../../components/notifier';

class Book extends Component {
	state = {
		responseStatus: false
	};

	bookaService(values) {
		let { serviceTime, serviceDate } = values;
		serviceTime = serviceTime.format('HH:mm');
		let session = serviceDate.set({ hours: serviceTime.split(':')[0], minutes: serviceTime.split(':')[1] });
		values.Session_Time = {
			From: session.format('YYYY-MM-DD HH:mm:ss'),
			To: session.add(values.serviceHours, 'h').format('YYYY-MM-DD HH:mm:ss')
		};
		this.props.bookService(values);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.formResponse !== nextProps.formResponse) {
			let { Booking_ID } = nextProps.formResponse;
			if (Booking_ID) {
				this.props.history.push({ pathname: '/booksuccess' });
			}
		}
	}
	render() {
		return (
			<Row className="book">
				<Col xs={12}>
					<h3 className="text-center heading">Book a Service</h3>
				</Col>
				<Col xs={12}>
					<Row>
						<Col xs={12} sm={3} md={6} className="text-center ninja">
							<img src={standingNinja} alt="ninja" />
						</Col>
						<Col xs={12} sm={9} md={{ size: 4, offset: 1 }}>
							<h4 className="text-center font-weight-light">Fill up & get ninjafied</h4>
							<hr />
							<Notifier message={this.state.message} color="success" show={this.state.responseStatus} />
							<ServiceForm
								getValues={(values) => this.bookaService(values)}
								initialValues={this.props.userData}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

function mapStateToProps(reduxData) {
	return {
		formResponse: reduxData.BookService.data,
		userData: reduxData.UserDetails.data
	};
}

export default connect(mapStateToProps, {
	bookService
})(Book);
