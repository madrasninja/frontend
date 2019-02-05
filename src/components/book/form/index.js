import React, { Component } from "react";
import {  Form, FormGroup, Input, Button } from "reactstrap";
import {
    Field,
    reduxForm
} from "redux-form";

class ServiceForm extends Component {

    generateInput(field) {
        return (
            <div>
                <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <span className="text-danger">{field.meta.touched? field.meta.error:''}</span>
            </div>
        );
    }

    render() {
        return(
            <div className="booking-form">
                <Form onSubmit={this.props.handleSubmit(this.props.getValues.bind(this))} >
                    <FormGroup>
                        <Field
                            placeholder="Enter your Firstname"
                            name="firstname"
                            type="text"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Enter your Lastname"
                            name="lastname"
                            type="text"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <div className="text-center">
                        <Button color="primary">Book</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'serviceForm',
    enableReinitialize: true
})(ServiceForm)