import React, { Component, useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import './Book.scss';
import ServiceForm from './form';
import { bookService } from './../../services/BookService';

const Book = () => {
	const dispatch = useDispatch();

	const [ responseStatus, setresponseStatus ] = useState(false);

	const formResponse = useSelector((state) => state.BookService.data);
	const userData = useSelector((state) => state.UserDetails.data);

	useEffect(() => {
		console.log(formResponse);
	}, []);

	const bookaService = (values) => {
		let { serviceTime, serviceDate } = values;
		serviceTime = serviceTime.format('HH:mm');
		let session = serviceDate.set({ hours: serviceTime.split(':')[0], minutes: serviceTime.split(':')[1] });
		values.Session_Time_From = session.format('YYYY-MM-DD HH:mm:ss');
		dispatch(bookService(values));
	};

	return (
		<Row className="book">
			<Col xs={12}>
				<h3 className="text-center heading">Book a Service</h3>
			</Col>
			<Col xs={12}>
				<Row>
					<Col xs={12}>
						<hr />
						<ServiceForm getValues={(values) => bookaService(values)} initialValues={userData} />
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Book;
