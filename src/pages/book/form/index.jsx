import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Button } from "reactstrap";
import {
    reduxForm, getFormValues
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

import FormField from "./../../../components/form-field";
import { validator } from "./../../../const/validator";

class ServiceForm extends Component {

    renderHours(data) {
        let tempDate = new Date(0, 0);
        tempDate.setSeconds(+data * 60 * 60);
        return tempDate.toTimeString().slice(0, 5);
    }

    renderSummary(formValues) {
        const { Service_Type_ID, No_Of_Staff } = formValues;
        const { serviceTypeList } = this.props;
        if (Service_Type_ID && No_Of_Staff) {
            let Service = undefined;
            serviceTypeList.data.map(data => {
                console.log(data.timePerStaff)
                if (data.timePerStaff && data._id == Service_Type_ID)
                    Service = data;
            })
            if (Service) {
                return (
                    <div>
                        <hr />
                        <div className="text-black-50">Estimated time of Service</div>
                        <h4>{this.renderHours(Service.timePerStaff[No_Of_Staff] / 60)}</h4>
                        <small className="text-black-50">
                            &#8377; {parseFloat(Service.amount)}/hour/staff
                        </small>
                        <hr />
                        Total <span className="float-right">
                            &#8377; {((Service.timePerStaff[No_Of_Staff] / 60) * No_Of_Staff) * parseFloat(Service.amount)}
                        </span>
                    </div>
                )
            }
        } else {
            return null;
        }
    }

    render() {
        let { required, number, mobile_number, email} = validator;
        return(
            <div className="booking-form">
                <Form onSubmit={this.props.handleSubmit(this.props.getValues.bind(this))} >
                    <Row>
                        <Col xs={12} md={8}>
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
                        </Col>
                        <Col xs={12} md={4}>
                            <FormGroup>
                                <FormField
                                    placeholder="No of Staff"
                                    name="No_Of_Staff"
                                    list={[{_id: 1, name: 1},{_id: 2, name: 2},{_id: 3, name:3}]}
                                    keyword="_id"
                                    option="name"
                                    type="select"
                                    validate={[required]}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
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
                        </Col>
                        <Col xs={12} md={4}>
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
                                    placeholder="Address"
                                    name="Address"
                                    type="textarea"
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
                                <FormField
                                    placeholder="Time"
                                    name="serviceTime"
                                    type="time"
                                    validate={[required]}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={4} className="align-self-end">
                            {this.renderSummary(this.props.formValues)}
                        </Col>
                    </Row>
                    <div className="text-right mt-4">
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
        localityList: reduxData.LocalityList,
        formValues: getFormValues('serviceForm')(reduxData)
    }
}

export default reduxForm({
    form: 'serviceForm',
    enableReinitialize: true
})(connect(mapStateToProps, {})(ServiceForm))