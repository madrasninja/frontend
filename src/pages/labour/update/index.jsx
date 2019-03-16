import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import API_CALL from './../../../services';
import { savelabour } from './../../../services/SaveLabour';
import AddForm from './../form';
import Notifier from './../../../components/notifier';

class UpdateLabour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			responseStatus: false
		};
		API_CALL('get', 'getuser/3/' + this.props.match.params.id, null, null, (data) => {
			this.setState({
				labourDetails: data[0]
			});
		});
	}

	save(data) {
		data.Service_Time.From = data.Service_Time.From.format('HH:mm');
		data.Service_Time.To = data.Service_Time.To.format('HH:mm');
		this.props.savelabour(data);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.formResponse !== nextProps.formResponse) {
			let { message, response } = nextProps.formResponse.data;
			if (response === 'success') {
				this.setState({
					responseStatus: true,
					message
				});
			}
		}
	}

	render() {
		const { labourDetails } = this.state;
		return (
			<Row>
				<Col xs={12} sm={12} md={{ size: 6, offset: 3 }}>
					<h3 className="text-center">Update Labour</h3>
					<hr />
					<Notifier message={this.state.message} color="success" show={this.state.responseStatus} />
					<AddForm getValues={(values) => this.save(values)} initialValues={labourDetails} />
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

export default connect(mapStateToProps, { savelabour })(UpdateLabour);
