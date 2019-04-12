import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';

import FormField from './../../../components/form-field';
import { validator } from './../../../const/validator';

class LoginForm extends Component {
	render() {
		let { required } = validator;
		const { handleSubmit } = this.props;
		return (
			<div>
				<Form onSubmit={handleSubmit(this.props.getValues.bind(this))}>
					<FormGroup>
						<FormField
							label="Email ID/Mobile Number"
							placeholder="Enter your Email ID or Mobile Number"
							name="email"
							type="text"
							validate={[ required ]}
						/>
					</FormGroup>
					<FormGroup>
						<FormField placeholder="Password" name="password" type="password" validate={[ required ]} />
					</FormGroup>
					<div className="text-center mt-4">
						<Button color="primary" block>
							Signin
						</Button>
					</div>
				</Form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'loginForm',
	enableReinitialize: true
})(LoginForm);
