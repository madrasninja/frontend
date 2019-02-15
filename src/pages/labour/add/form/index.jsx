import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import {
    Field,
    reduxForm
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

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
                    <Input type="select" disabled={field.disable} {...field.input}>
                        <option value="">Select {field.placeholder}</option>
                        {optionList}
                    </Input>
                    <span className="text-danger">{field.meta.error}</span>
                </div>
            )
        } else {
            return (
                <div>
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...field.input}
                    />
                    {/* <span className="p-float-label">
                        <InputText className="form-control" id="in" type={field.type} {...field.input}/>
                        <label htmlFor="in">{field.placeholder}</label>
                    </span> */}
                    <span className="text-danger">{field.meta.touched ? field.meta.error : ''}</span>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="booking-form">
                <Form onSubmit={this.props.handleSubmit(this.props.getValues.bind(this))} >
                    <FormGroup>
                        <Field
                            placeholder="Firstname"
                            name="First_Name"
                            type="text"
                            component={this.generateInput}
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
                                />
                            </Col>
                            <Col xs={6} style={{ paddingLeft: '0px' }}>
                                <Field
                                    placeholder="Service To"
                                    name="Service_Time.To"
                                    type="time"
                                    component={this.generateInput}
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
                            type="number"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Alternate Mobile Number"
                            name="Alternate_Mobile_Number"
                            type="number"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Email ID"
                            name="Email_Id"
                            type="email"
                            component={this.generateInput}
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