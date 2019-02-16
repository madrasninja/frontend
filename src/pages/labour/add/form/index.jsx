import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import {
    Field,
    reduxForm
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

import { validator } from "./../../../../const/validator";

class AddForm extends Component {

    generateInput(field) {
        if (field.type === 'select') {
            let optionList = _.map(field.list, (data, index) => {
                return (
                    <option value={data[field.keyword]} key={index}>
                        {data[field.label]}
                    </option>
                );
            })
            return (
                <div>
                    <Input type="select" disabled={field.disable} className={field.meta.touched && field.meta.error ? 'input-error' : ''} {...field.input}>
                        <option value="">Select {field.placeholder}</option>
                        {optionList}
                    </Input>
                    {
                        field.meta.error && field.meta.touched ?
                            <div className="error">
                                <span className="icon">!</span>
                                <span className="message">{field.meta.error}</span>
                            </div>
                            : ''
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...field.input}
                        className={field.meta.touched && field.meta.error ? 'input-error' : ''}
                    />
                    {
                        field.meta.error && field.meta.touched ?
                            <div className="error">
                                <span className="icon">!</span>
                                <span className="message">{field.meta.error}</span>
                            </div>
                            : ''
                    }
                </div>
            );
        }
    }

    render() {
        const { required, number, mobile_number, email } = validator;
        return (
            <div className="booking-form">
                <Form onSubmit={this.props.handleSubmit(this.props.getValues.bind(this))} >
                    <FormGroup>
                        <Field
                            placeholder="Firstname"
                            name="First_Name"
                            type="text"
                            component={this.generateInput}
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Lastname"
                            name="Last_Name"
                            type="text"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Service"
                            name="Service_Type_ID"
                            list={this.props.serviceTypeList.data}
                            keyword="_id"
                            label="name"
                            type="select"
                            component={this.generateInput}
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs={6}>
                                <Field
                                    placeholder="Service From"
                                    name="Service_Time.From"
                                    type="time"
                                    component={this.generateInput}
                                    validate={[required]}
                                />
                            </Col>
                            <Col xs={6} style={{ paddingLeft: '0px' }}>
                                <Field
                                    placeholder="Service To"
                                    name="Service_Time.To"
                                    type="time"
                                    component={this.generateInput}
                                    validate={[required]}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Locality"
                            name="Locality_ID"
                            list={this.props.localityList.data}
                            keyword="_id"
                            label="name"
                            type="select"
                            component={this.generateInput}
                            validate={[required]}
                        />
                    </FormGroup>
                    {/* <FormGroup>
                        <Field
                            placeholder="Address"
                            name="Address"
                            type="textarea"
                            component={this.generateInput}
                        />
                    </FormGroup> */}
                    <FormGroup>
                        <Field
                            placeholder="Mobile Number"
                            name="Mobile_Number"
                            type="text"
                            component={this.generateInput}
                            validate={[required, number, mobile_number]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Alternate Mobile Number"
                            name="Alternate_Mobile_Number"
                            type="text"
                            component={this.generateInput}
                            validate={[number, mobile_number]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Email ID"
                            name="Email_Id"
                            type="text"
                            component={this.generateInput}
                            validate={[required, email]}
                        />
                    </FormGroup>
                    <div className="text-center">
                        <Button color="primary">Add</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(reduxData) {
    return {
        serviceTypeList: reduxData.ServiceTypeList,
        localityList: reduxData.LocalityList
    }
}

export default reduxForm({
    form: 'addLabourForm',
    enableReinitialize: true
})(connect(mapStateToProps, {})(AddForm))