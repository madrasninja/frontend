import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	CardFooter,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import _ from 'lodash';

import { userType } from '../../../const/user-type';
import { getUserList } from './../../../services/UserList';
import API_CALL from '../../../services';

@connect(
	(reduxData) => {
		return {
			userList: reduxData.UserList,
			userData: reduxData.UserDetails.data
		};
	},
	{ getUserList }
)
export default class UserHome extends Component {
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

	deleteUser = (id) => {
		API_CALL('get', `deleteuser/${id}`, null, null, (data) => {
			const { code, message } = data;
			if (code == 'MNS040') {
				this.props.getUserList();
			}
		});
	};

	makeAsAdmin = (id) => {
		API_CALL('get', `makeusadmin/${id}`, null, null, (data) => {
			const { code, message } = data;
			if (code == 'MNS020') {
				this.props.getUserList();
			}
		});
	};

	renderList(list) {
		if (list.data) {
			const currentUserID = this.props.userData._id;
			return _.map(list.data, (data, index) => {
				const { First_Name, Last_Name, Mobile_Number, User_Type, Email_Id, _id } = data;
				if (_id != currentUserID) {
					return (
						<Col xs={12} sm={6} md={4} key={index}>
							<Card>
								<CardBody>
									<Row>
										<Col xs={10} className="text-capitalize">
											{First_Name} {Last_Name}
										</Col>
										<Col xs={2}>
											<UncontrolledDropdown className="float-right">
												<DropdownToggle className="option" color="link">
													<i className="fa fa-ellipsis-v" />
												</DropdownToggle>
												<DropdownMenu right>
													{User_Type == 4 ? (
														<DropdownItem
															onClick={() => {
																this.makeAsAdmin(_id);
															}}
														>
															Make as Admin
														</DropdownItem>
													) : null}
													<DropdownItem
														onClick={() => {
															this.deleteUser(_id);
														}}
													>
														Delete
													</DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown>
										</Col>
									</Row>
									<Button color={this.returnColor(User_Type)} size="sm" />{' '}
									<small className="text-black-50">{userType[User_Type]}</small>
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
				}
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
