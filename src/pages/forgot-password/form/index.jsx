import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';

import FormField from './../../../components/form-field';
import { validator } from './../../../const/validator';

class ForgotPasswordForm extends Component {
	render() {
		let { required } = validator;
		const { handleSubmit } = this.props;
		return (
			<div>
				<Form onSubmit={handleSubmit(this.props.getValues.bind(this))}>
					<FormGroup>
						<FormField placeholder="Email ID" name="Email_Id" type="text" validate={[ required ]} />
					</FormGroup>
					<div className="text-center mt-4">
						<Button color="primary" block>
							Submit
						</Button>
					</div>
				</Form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'forgotPasswordForm',
	enableReinitialize: true
})(ForgotPasswordForm);
