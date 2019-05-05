import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { userType } from '../../const/user-type';
import { getBookingList } from './../../services/BookingList';
import './Dashboard.scss';
import BookingCard from '../../components/booking-card';
import NoData from '../../components/no-data';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getBookingList();
	}

	renderList(list) {
		if (list.length > 0) {
			return _.map(list, (data, index) => {
				if (index <= 2) return <BookingCard data={data} key={index} />;
			});
		} else {
			return (
				<Col>
					<NoData message="Sorry, we couldn't find any booking" />
				</Col>
			);
		}
	}

	render() {
		const { First_Name, Last_Name, Email_Id, Mobile_Number, User_Type } = this.props.userData;
		const { data } = this.props.list;
		return (
			<Row className="dashboard">
				<Col xs={12} className="text-center heading">
					<h2 className="font-weight-light">{`Hey ${First_Name} ${Last_Name}`}</h2>
					<p className="text-black-50">{User_Type && User_Type != 4 ? userType[User_Type] : ''}</p>
					<Row className="text-black-50 mt-4 mb-4">
						<Col>{Email_Id}</Col>
						<Col>{Mobile_Number}</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<h4 className="font-weight-light">Recent bookings</h4>
				</Col>
				<Col xs={12} className="content">
					<Row>{data.UpcomingBooking && this.renderList(data.UpcomingBooking)}</Row>
					{data.length == 0 ? <NoData message="Sorry, we couldn't find any booking" /> : ''}
					{data.UpcomingBooking && data.UpcomingBooking.length > 3 ? (
						<Row className="view-more">
							<Col className="text-center">
								<Link to="/bookings">View more</Link>
							</Col>
						</Row>
					) : (
						''
					)}
				</Col>
			</Row>
		);
	}
}

export default connect(
	(reduxData) => {
		return {
			list: reduxData.BookingList,
			userData: reduxData.UserDetails.data
		};
	},
	{ getBookingList }
)(Dashboard);
