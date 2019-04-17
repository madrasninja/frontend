import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';

import FormField from './../../../components/form-field';
import { validator } from './../../../const/validator';

class ChangePasswordForm extends Component {
    render() {
        let { required } = validator;
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.props.getValues.bind(this))}>
                    <FormGroup>
                        <FormField
                            label="Old Password"
                            placeholder="Enter old password"
                            name="Old_Password"
                            type="password"
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            label="New Password"
                            placeholder="Enter new password"
                            name="New_Password" type="password"
                            validate={[required]} />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            label="Confirm New Password"
                            placeholder="Confirm new password"
                            name="Confirm_Password"
                            type="password"
                            validate={[required]} />
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

function validate(values) {
    const errors = {};

    if (values.New_Password !== values.Confirm_Password) {
        errors.Confirm_Password = "Confirm Password does not match"
    }

    // if (values.New_Password) {
    //     if (values.New_Password.length < 8) {
    //         errors.New_Password = "Minimum it should have 8 characters"
    //     }
    // }
    // if (values.Confirm_Password) {
    //     if (values.Confirm_Password.length < 8) {
    //         errors.Confirm_Password = "Minimum it should have 8 characters"
    //     }
    // }
    return errors;
}

export default reduxForm({
    validate,
    form: 'changePasswordForm',
    enableReinitialize: true
})(ChangePasswordForm);
