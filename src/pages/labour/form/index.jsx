import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Button } from "reactstrap";
import {
    reduxForm
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

import FormField from "../../../components/form-field";
import { validator } from "./../../../const/validator";

class AddForm extends Component {

    render() {
        const { required, number, mobile_number, email } = validator;
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit(this.props.getValues.bind(this))} >
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
                            placeholder="Service"
                            name="Service_Type_ID"
                            list={this.props.serviceTypeList.data}
                            keyword="_id"
                            option="name"
                            type="select"
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs={6}>
                                <FormField
                                    placeholder="Service From"
                                    name="Service_Time.From"
                                    type="time"
                                    validate={[required]}
                                />
                            </Col>
                            <Col xs={6} style={{ paddingLeft: '0px' }}>
                                <FormField
                                    placeholder="Service To"
                                    name="Service_Time.To"
                                    type="time"
                                    validate={[required]}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            placeholder="Locality"
                            name="Locality_ID"
                            list={this.props.localityList.data}
                            keyword="_id"
                            option="name"
                            type="select"
                            validate={[required]}
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
                            placeholder="Alternate Mobile Number"
                            name="Alternate_Mobile_Number"
                            type="text"
                            validate={[number, mobile_number]}
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
                    <div className="text-center">
                        <Button color="primary">Submit</Button>
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