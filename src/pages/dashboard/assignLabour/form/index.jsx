import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ModalBody, ModalFooter, Button, Spinner, Alert } from 'reactstrap';
import axios from 'axios';

import { getLabourForBooking } from '../../../../services/LabourListForBooking/index'
import './style.scss'

class AssignLabourForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinners: false,
            alertMessageToggle: false,
            alertMessage: {
                color: '',
                message: ''
            }
        }
    }

    componentDidMount() {
        this.props.getLabourForBooking(this.props.bookingId);
    }

    renderField = field => {
        const { meta: { touched, error } } = field;
        const className = `form-group row ${touched && error ? 'is-invalid' : ''}`

        if (field.type == 'dropdownValue') {
            let optionList = _.map(field.list, (data, index) => {
                return <option key={index} value={data[field.id]}>{`${data[field.firstName]}  ${data[field.lastName]}`}</option>;
            })
            return (
                <div className={className}>
                    <label className="col-sm-12 col-form-label col-form-label-sm text-center">{field.label}</label>
                    <div className='offset-sm-1 col-sm-10 text-center'>
                        <select className="form-control form-control-sm" {...field.input}>
                            <option value="">Select</option>
                            {optionList}
                        </select>
                        <div className="text-help">
                            {touched && error ? <div className='text-danger'>{error} </div> : ''}
                        </div>
                    </div>
                </div>
            )
        }
    }

    submitForm(values) {
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

    render() {
        const { handleSubmit, reset, pristine, submitting, labourListForBooking } = this.props;
        const { spinners, alertMessage, alertMessageToggle } = this.state;

        return (
            <div className='labourAssignForm'>
                <ModalBody>
                    <form >
                        <Field
                            label="Choose Labour"
                            type="dropdownValue" //api
                            id='_id'
                            firstName='First_Name'
                            lastName='Last_Name'
                            name="Labour_ID"
                            list={labourListForBooking.data}
                            component={this.renderField}
                        />

                        {alertMessageToggle ? <Alert color={alertMessage.color} className='alertWrap text-center'> {alertMessage.message}</Alert> : null}

                    </form >

                </ModalBody>

                <ModalFooter>
                    {
                        spinners === true ?
                            <Spinner color="primary" size="sm" />
                            :
                            <Button color="primary" size='sm' onClick={handleSubmit(this.submitForm.bind(this))}>Submit</Button>
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