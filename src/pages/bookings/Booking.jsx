import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { getBookingList } from './../../services/BookingList';
import BookingCard from '../../components/booking-card';
import './style.scss';

@connect(
	(reduxData) => {
		return {
			list: reduxData.BookingList
		};
	},
	{ getBookingList }
)
export default class Booking extends Component {
	renderList(list) {
		return _.map(list, (data, index) => {
			return <BookingCard data={data} key={index} />;
		});
	}
	componentDidMount() {
		this.props.getBookingList();
	}

	render() {
		const { data } = this.props.list;
		return (
			<Row className="bookings">
				<Col xs={12} className="text-center heading">
					<h2 className="font-weight-light">Booking History</h2>
				</Col>
				<Col xs={12} className="content">
					<Row>{data.UpcomingBooking && this.renderList(data.UpcomingBooking)}</Row>
				</Col>
				<Col xs={12} className="content">
					<Row>{data.PastBooking && this.renderList(data.PastBooking)}</Row>
				</Col>
			</Row>
		);
	}
}
