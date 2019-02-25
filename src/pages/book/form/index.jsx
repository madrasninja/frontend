import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Button } from "reactstrap";
import {
    reduxForm
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

import FormField from "./../../../components/form-field";
import { validator } from "./../../../const/validator";

class ServiceForm extends Component {

    render() {
        let { required, number, mobile_number, email} = validator;
        return(
            <div className="booking-form">
                <Form onSubmit={this.props.handleSubmit(this.props.getValues.bind(this))} >
                    <FormGroup>
                        <FormField
                            placeholder="Service"
                            name="Service_Type_ID"
                            list={this.props.serviceTypeList.data}
                            keyword="_id"
                            label="name"
                            type="select"
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            placeholder="Date"
                            name="serviceDate"
                            type="date"
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs={7}>
                                <FormField
                                    placeholder="Time"
                                    name="serviceTime"
                                    type="time"
                                    validate={[required]}
                                />
                            </Col>
                            <Col xs={5} style={{paddingLeft: '0px'}}>
                                <FormField
                                    placeholder="Hours"
                                    name="serviceHours"
                                    type="text"
                                    validate={[required, number]}
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
                            label="name"
                            type="select"
                            validate={[required]}
                        />
                    </FormGroup>
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
                            placeholder="Address"
                            name="Address"
                            type="textarea"
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
                            type="number"
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
                        <Button color="primary">Book</Button>
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
    form: 'serviceForm',
    enableReinitialize: true
})(connect(mapStateToProps, {})(ServiceForm))