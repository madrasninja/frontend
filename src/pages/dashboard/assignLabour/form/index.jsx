import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ModalBody, ModalFooter, Button, Spinner } from 'reactstrap';
import axios from 'axios';

import { getLabourForBooking } from '../../../../services/LabourListForBooking/index'

class AssignLabourForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinners: false
        }
    }
    
    componentDidMount() {
        this.props.getLabourForBooking(this.props.bookingId);
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group row ${touched && error ? 'is-invalid' : ''}`

        if (field.type == 'dropdownValue') {
            let optionList = _.map(field.list, (data, index) => {
                return <option key={index} value={data[field._id]}>{data[field.displayName]}</option>;
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
        // let reqInput = {
        //     Booking_ID: this.props.bookingId,
        //     Labour_ID: values._id
        // }

        // this.setState({ spinners: true })
        // Axios
        //     .post('http://api.madrasninja.com/assignlabour', reqInput)
        //     .then((response) => {
        //         this.setState({ spinners: false, alertMessage: true, alertMessage: response.data.message })
        //     })
        //     .catch((error) => {
        //         this.setState({ spinners: false, alertMessage: true })

        //     })
    }

    render() {
        const { handleSubmit, reset, pristine, submitting, labourListForBooking } = this.props;
        const { spinners } = this.state;

        return (
            <div>
                <ModalBody>
                    <form >
                        <Field
                            label="Choose Labour"
                            type="dropdownValue" //api
                            id='id'
                            displayName='name'
                            name="Labour_ID"
                            list={labourListForBooking.data}
                            component={this.renderField}
                        />
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