import React, { Component } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import {
    reduxForm
} from "redux-form";

import FormField from "./../../../components/form-field";
import { validator } from "./../../../const/validator";


class SignupForm extends Component {
    render() {
        let { required, number, email, mobile_number } = validator;
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.props.getValues.bind(this))} >
                    <FormGroup>
                        <FormField
                            placeholder="Firstname"
                            name="First_Name"
                            type="text"
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            placeholder="Lastname"
                            name="Last_Name"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            placeholder="Mobile Number"
                            name="Mobile_Number"
                            type="text"
                            validate={[required, number, mobile_number]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            placeholder="Email ID"
                            name="Email_Id"
                            type="text"
                            validate={[required, email]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            placeholder="Password"
                            name="password"
                            type="password"
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            placeholder="Confirm Password"
                            name="cpassword"
                            type="password"
                            validate={[required]}
                        />
                    </FormGroup>
                    <div className="text-center mt-4">
                        <Button color="primary" block>Join</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'signupForm',
    enableReinitialize: true
})(SignupForm);