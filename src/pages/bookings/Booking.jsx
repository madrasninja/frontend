import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import { getBookingList } from './../../services/BookingList';
import BookingCard from '../../components/booking-card';
import NoData from '../../components/no-data';
import './style.scss';

const Booking = () => {
	const dispatch = useDispatch();

	const data = useSelector((state) => {
		return state.BookingList.data;
	});

	const [ activeTab, setactiveTab ] = useState('UpcomingBooking');

	useEffect(() => dispatch(getBookingList()), []);

	const toggle = (instance) => {
		if (activeTab != instance) {
			setactiveTab(instance);
		}
	};

	const renderList = (list) => {
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
	};

	return (
		<Row className="bookings">
			<Col xs={12} className="text-center heading">
				<h2 className="font-weight-light">Booking History</h2>
			</Col>
			<Col xs={12} className="content">
				<Nav tabs justified>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === 'UpcomingBooking' })}
							onClick={() => {
								toggle('UpcomingBooking');
							}}
						>
							Current
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === 'PastBooking' })}
							onClick={() => {
								toggle('PastBooking');
							}}
						>
							Past
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === 'Cancelled' })}
							onClick={() => {
								toggle('Cancelled');
							}}
						>
							Cancelled
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="UpcomingBooking">
						<Row>{data.UpcomingBooking && renderList(data.UpcomingBooking)}</Row>
					</TabPane>
					<TabPane tabId="PastBooking">
						<Row className="old">{data.PastBooking && renderList(data.PastBooking)}</Row>
					</TabPane>
					<TabPane tabId="Cancelled">
						<Row className="old">{data.Cancelled && renderList(data.Cancelled)}</Row>
					</TabPane>
					{data.length == 0 ? <NoData message="Sorry, we couldn't find any booking" /> : ''}
				</TabContent>
			</Col>
		</Row>
	);
};

export default Booking;
