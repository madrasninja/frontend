import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';
import _ from 'lodash';

import { userType } from '../../../const/user-type';
import { getUserList } from './../../../services/UserList';

class UserHome extends Component {
	constructor(props) {
		super(props);
		props.getUserList();
	}

	returnColor(type) {
		if (type == 1) return 'danger';
		else if (type == 2) return 'success';
		else if (type == 3) return 'secondary';
		else return 'primary';
	}

	renderList(list) {
		if (list.data) {
			return _.map(list.data, (data, index) => {
				const { First_Name, Last_Name, Mobile_Number, User_Type, Email_Id } = data;
				return (
					<Col xs={12} sm={6} md={4} key={index}>
						<Card>
							<CardBody>
								<CardTitle className="">
									<span className="text-capitalize">
										{First_Name} {Last_Name}
										<br />
										<Button color={this.returnColor(User_Type)} size="sm" />{' '}
										<small className="text-black-50">{userType[User_Type]}</small>
									</span>
								</CardTitle>
								<CardText>
									<small>
										{Mobile_Number}
										<br />
										{Email_Id}
									</small>
								</CardText>
							</CardBody>
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
					<Row>{this.renderList(this.props.userList)}</Row>
				</Col>
			</Row>
		);
	}
}

export default connect(
	(reduxData) => {
		return {
			userList: reduxData.UserList
		};
	},
	{ getUserList }
)(UserHome);
