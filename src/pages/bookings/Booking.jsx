import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import { getBookingList } from './../../services/BookingList';
import BookingCard from '../../components/booking-card';
import NoData from '../../components/no-data';
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
	state = {
		activeTab: 'UpcomingBooking'
	};
	renderList(list) {
		if (list.length > 0) {
			return _.map(list, (data, index) => {
				return <BookingCard data={data} key={index} />;
			});
		} else {
			return (
				<Col>
					<NoData message="Sorry, we couldn't find any booking" />
				</Col>
			);
		}
	}
	componentDidMount() {
		this.props.getBookingList();
	}

	toggle = (instance) => {
		if (this.state.activeTab !== instance) {
			this.setState({
				activeTab: instance
			});
		}
	};

	render() {
		const { data } = this.props.list;
		return (
			<Row className="bookings">
				<Col xs={12} className="text-center heading">
					<h2 className="font-weight-light">Booking History</h2>
				</Col>
				<Col xs={12} className="content">
					<Nav tabs justified>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === 'UpcomingBooking' })}
								onClick={() => {
									this.toggle('UpcomingBooking');
								}}
							>
								Current
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === 'PastBooking' })}
								onClick={() => {
									this.toggle('PastBooking');
								}}
							>
								Past
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === 'Cancelled' })}
								onClick={() => {
									this.toggle('Cancelled');
								}}
							>
								Cancelled
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="UpcomingBooking">
							<Row>{data.UpcomingBooking && this.renderList(data.UpcomingBooking)}</Row>
						</TabPane>
						<TabPane tabId="PastBooking">
							<Row className="old">{data.PastBooking && this.renderList(data.PastBooking)}</Row>
						</TabPane>
						<TabPane tabId="Cancelled">
							<Row className="old">{data.Cancelled && this.renderList(data.Cancelled)}</Row>
						</TabPane>
						{data.length == 0 ? <NoData message="Sorry, we couldn't find any booking" /> : ''}
					</TabContent>
				</Col>
			</Row>
		);
	}
}
