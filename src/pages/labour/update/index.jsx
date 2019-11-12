import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import API_CALL from './../../../services';
import { savelabour } from './../../../services/SaveLabour';
import AddForm from './../form';
import Notifier from './../../../components/notifier';
import moment, { isMoment } from 'moment';
import ImageCrop from '../../../components/image-crop';
import { addNotification } from '../../../services/NotificationService';
import Loader from '../../../components/loader';

class UpdateLabour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			responseStatus: false,
			labourDetails: {
				Service_Time: {}
			},
			avatar: undefined
		};
	}

	componentDidMount() {
		API_CALL('get', 'getuser/3/' + this.props.match.params.id, null, null, (response) => {
			const { data, code } = response;
			if (code == 'MNS020') {
				this.setState({
					labourDetails: data.activeUser[0]
				});
			}
		});
	}

	save(data) {
		const { avatar } = this.state;
		if (avatar) {
			data.avatar = avatar;
		}
		if (isMoment(data.DOB)) data.DOB = data.DOB.format('YYYY-MM-DD');
		data.Id_Prof = data.Id_Prof[0];
		data.Service_Time_From = data.Service_Time.From.format('HH:mm');
		data.Service_Time_To = data.Service_Time.To.format('HH:mm');
		let formdata = new FormData();
		for (let i in data) {
			formdata.append(i, data[i]);
		}
		this.props.savelabour(formdata);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.formResponse !== nextProps.formResponse) {
			let { code, message } = nextProps.formResponse.data;
			if (code === 'MNS002') {
				this.props.addNotification({ title: 'Success', message, color: 'bg-success' });
				this.props.history.push('/labour/home');
				// this.setState({
				// 	responseStatus: true,
				// 	message,
				// 	color: 'success'
				// });
			} else if (!nextProps.formResponse.requesting) {
				this.setState({
					responseStatus: true,
					message,
					color: 'danger'
				});
			}
		}
	}

	render() {
		let { labourDetails, message, color, responseStatus } = this.state;
		let { Service_Time: { From, To } } = labourDetails;
		if (!isMoment(From) && From)
			labourDetails.Service_Time.From = moment().set('h', From.split(':')[0]).set('m', From.split(':')[1]);
		if (!isMoment(To) && To)
			labourDetails.Service_Time.To = moment().set('h', To.split(':')[0]).set('m', To.split(':')[1]);
		return (
			<Row>
				<Col xs={12} sm={12} md={{ size: 6, offset: 3 }}>
					<h3 className="text-center">Update Labour</h3>
					<hr />
					<ImageCrop image={labourDetails.avatar} setImage={(file) => this.setState({ avatar: file })} />
					<AddForm getValues={(values) => this.save(values)} initialValues={labourDetails} />
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

export default connect(mapStateToProps, { savelabour, addNotification })(UpdateLabour);
