import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import userImage from '../../../assets/img/user.svg';

import { getLabourList } from './../../../services/LabourList';

class LabourHome extends Component {
	constructor(props) {
		super(props);
		props.getLabourList();
	}

	renderGenderIcon = (type) => {
		if (type == 'm') return <i className="fas fa-male" />;
		else if (type == 'f') return <i className="fas fa-female" />;
		else return null;
	};

	renderList(list) {
		if (list) {
			return _.map(list, (data, index) => {
				let imgUrl = userImage;
				if (data.avatar) {
					imgUrl = data.avatar;
				}
				return (
					<Col xs={12} sm={6} md={4} key={index}>
						<Card>
							<CardBody>
								<Row>
									<Col xs={9} className="align-self-center">
										<span className="text-capitalize">
											{data.First_Name} {data.Last_Name}
										</span>
										<br />
										<small>
											{moment(data.Service_Time.From, 'hh:mm').format('hh:mmA')} -{' '}
											{moment(data.Service_Time.To, 'hh:mm').format('hh:mmA')} {' '}
										</small>
									</Col>
									<Col xs={3}>
										<img src={imgUrl} className="labour-img" />
									</Col>
								</Row>
								<div className="text-black-50 mt-2">
									{data.service_type.name} at {data.locality.name}
								</div>
								<CardText className="text-black-50 mt-2">
									<small>
										{data.Mobile_Number ? (
											<span>
												<i className="fas fa-phone" /> {data.Mobile_Number}
											</span>
										) : null}
										{data.DOB ? (
											<span className="splitter">
												<i className="fas fa-birthday-cake" /> {data.DOB}
											</span>
										) : null}
										<span className="splitter">{this.renderGenderIcon(data.Gender)}</span>
										<br />
										{data.Address ? (
											<span>
												<i className="fas fa-map-marker-alt" /> {data.Address}
											</span>
										) : null}
									</small>
								</CardText>
							</CardBody>
							<CardFooter>
								{data.Id_Prof ? (
									<a href={data.Id_Prof} target="_blank">
										<i className="far fa-id-badge" title="ID Proof" />
									</a>
								) : (
									''
								)}
								<Link to={'/labour/update/' + data._id}>
									<Button className="float-right" color="primary" size="sm">
										Update
									</Button>
								</Link>
							</CardFooter>
						</Card>
					</Col>
				);
			});
		}
	}

	render() {
		return (
			<Row>
				<Col xs={12}>
					<Row>{this.renderList(this.props.labourList)}</Row>
				</Col>
			</Row>
		);
	}
}

export default connect(
	(reduxData) => {
		return {
			labourList: reduxData.LabourList.data
		};
	},
	{ getLabourList }
)(LabourHome);
