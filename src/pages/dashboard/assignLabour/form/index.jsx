import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
    ModalBody, ModalFooter, FormGroup, Form,
    Button, Spinner, Alert, Input, Row, Col, Label
} from 'reactstrap';
import axios from 'axios';

import FormField from "../../../../components/form-field";
import { validator } from "../../../../const/validator";
import { getLabourForBooking } from '../../../../services/LabourListForBooking/index';
import { getBookingList } from '../../../../services/BookingList/index';
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

    submitForm = ({ Labour_ID }) => {
        const { bookingId, reset, getBookingList } = this.props;

        let reqInput = {
            Booking_ID: bookingId,
            Labour_ID
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
                reset();
                getBookingList();
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
        const { required } = validator;

        return (
            <div>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            {/* <Field
                                label="Choose Labour"
                                type="select" //api
                                keyword='_id'
                                firstName='First_Name'
                                lastName='Last_Name'
                                name="Labour_ID"
                                list={labourListForBooking.data}
                                component={this.generateInput}
                            /> */}
                            <FormField
                                name="Labour_ID"
                                list={labourListForBooking.data}
                                placeholder="Labour"
                                keyword='_id'
                                label={"First_Name" + "Last_Name"}
                                type="select"
                                validate={[required]}
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

const mapStateToProps = ({ labourListForBooking }) => {
    return {
        labourListForBooking
    }
}

export default reduxForm({    
    form: 'AssignLabourForm'
})(
    connect(mapStateToProps, { getLabourForBooking, getBookingList })(AssignLabourForm)
);