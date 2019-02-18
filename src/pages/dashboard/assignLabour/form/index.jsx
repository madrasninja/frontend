import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
    ModalBody, ModalFooter, FormGroup, Form,
    Button, Spinner, Alert, Input, Row, Col, Label
} from 'reactstrap';
import axios from 'axios';

import { getLabourForBooking } from '../../../../services/LabourListForBooking/index'
import './style.scss'

class AssignLabourForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinners: false,
            visible: true,
            alertMessageToggle: false,
            alertMessage: {
                color: 'danger',
                message: 'oops something went wrong'
            }
        }
    }

    componentDidMount() {
        this.props.getLabourForBooking(this.props.bookingId);
    }

    generateInput = field => {
        if (field.type === 'select') {
            let optionList = _.map(field.list, (data, index) => {
                return (
                    <option value={data[field.keyword]} key={index}>
                        {`${data[field.firstName]} ${data[field.lastName]}`}
                    </option>
                );
            })
            return (
                <Col sm={{ size: 10, offset: 1 }}>
                    <Label size='sm'>{field.label}</Label>
                    <Input
                        size='sm'
                        type="select"
                        disabled={field.disable}
                        className={field.meta.touched && field.meta.error ? 'input-error' : ''} {...field.input}
                        >
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
                </Col>
            )
        }
    }

    submitForm = values => {
        const { bookingId } = this.props;

        let reqInput = {
            Booking_ID: bookingId,
            Labour_ID: values.Labour_ID
        }

        this.setState({ spinners: true })
        axios
            .post('http://api.madrasninja.com/assignlabour', reqInput)
            .then((response) => {
                this.setState({
                    spinners: false,
                    alertMessageToggle: true,
                    alertMessage: { color: 'success', message: response.data.message }
                });
                this.props.reset();
            })
            .catch((error) => {
                this.setState({
                    spinners: false,
                    alertMessageToggle: true,
                    alertMessage: { color: 'danger', message: 'Oops! something went wrong try again.' }
                })
            })
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        const { handleSubmit, reset, pristine, submitting, labourListForBooking } = this.props;
        const { spinners, alertMessage, alertMessageToggle, visible } = this.state;

        return (
            <div>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            <Field
                                label="Choose Labour"
                                type="select" //api
                                keyword='_id'
                                firstName='First_Name'
                                lastName='Last_Name'
                                name="Labour_ID"
                                list={labourListForBooking.data}
                                component={this.generateInput}
                            />

                            {alertMessageToggle ?
                                <Alert
                                    isOpen={visible}
                                    toggle={this.onDismiss}
                                    color={alertMessage.color}
                                    className='alertWrap text-center'
                                > {alertMessage.message}
                                </Alert> : null
                            }
                        </FormGroup>
                    </Form>

                </ModalBody>

                <ModalFooter>
                    {
                        spinners === true ?
                            <Spinner color="primary" size="sm" />
                            :
                            <Button color="primary" size='sm' onClick={handleSubmit(this.submitForm)}>Submit</Button>
                    }

                </ModalFooter>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.Labour_ID) {
        errors.Labour_ID = 'Please Select Labour'
    }

    return errors;
}

const mapStateToProps = (reduxData) => {
    return {
        labourListForBooking: reduxData.labourListForBooking
    }
}

export default reduxForm({
    validate,
    form: 'AssignLabourForm'
})(
    connect(mapStateToProps, { getLabourForBooking })(AssignLabourForm)
);