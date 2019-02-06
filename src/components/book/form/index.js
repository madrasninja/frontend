import React, { Component } from "react";
import {  Form, FormGroup, Input, Button } from "reactstrap";
import {
    Field,
    reduxForm
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

class ServiceForm extends Component {

    generateInput(field) {
        if (field.type === 'select') {
            let optionList = _.map(field.list, (data, index)=> {
                return (
                    <option value={data[field.keyword]} key={index}>
                        {data[field.label]}
                    </option>
                );
            })
            return(
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
                    <span className="text-danger">{field.meta.touched? field.meta.error:''}</span>
                </div>
            );
        }
    }

    render() {
        return(
            <div className="booking-form">
                <Form onSubmit={this.props.handleSubmit(this.props.getValues.bind(this))} >
                    <FormGroup>
                        <Field
                            placeholder="Select Service"
                            name="Service_ID"
                            list={this.props.serviceTypeList.data}
                            keyword="_id"
                            label="name"
                            type="select"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Select Locality"
                            name="Locality_ID"
                            list={this.props.localityList.data}
                            keyword="_id"
                            label="name"
                            type="select"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Enter your Firstname"
                            name="First_Name"
                            type="text"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Enter your Lastname"
                            name="Last_Name"
                            type="text"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Address"
                            name="Address"
                            type="textarea"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Enter Mobile Number"
                            name="Mobile_Number"
                            type="number"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Enter Alternate Mobile Number"
                            name="Alternate_Mobile_Number"
                            type="number"
                            component={this.generateInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            placeholder="Enter your Email ID"
                            name="Email_Id"
                            type="email"
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