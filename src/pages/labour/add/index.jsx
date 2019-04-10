import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { savelabour } from './../../../services/SaveLabour';
import AddForm from './../form';
import Notifier from './../../../components/notifier';

class AddLabour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			responseStatus: false
		};
	}

	save(data) {
		data.Service_Time.From = data.Service_Time.From.format('HH:mm');
		data.Service_Time.To = data.Service_Time.To.format('HH:mm');
		this.props.savelabour(data);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.formResponse !== nextProps.formResponse) {
			let { code, message } = nextProps.formResponse.data;
			if (code === 'MNS003') {
				this.setState({
					responseStatus: true,
					message,
					color: 'success'
				});
			} else {
				this.setState({
					responseStatus: true,
					message,
					color: 'danger'
				});
			}
		}
	}

	render() {
		const { message, responseStatus, color } = this.state;
		return (
			<Row>
				<Col xs={12} sm={12} md={{ size: 6, offset: 3 }}>
					<h3 className="text-center">Add Labour</h3>
					<hr />
					<AddForm getValues={(values) => this.save(values)} />
					<Notifier message={message} color={color} show={responseStatus} />
				</Col>
			</Row>
		);
	}
}

function mapStateToProps(reduxData) {
	return {
		formResponse: reduxData.SaveLabour
	};
}

export default connect(mapStateToProps, { savelabour })(AddLabour);
