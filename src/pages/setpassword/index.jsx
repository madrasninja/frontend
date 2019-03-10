import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Button } from "reactstrap";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import './style.scss';
import API_CALL from "../../services";
import FormField from "../../components/form-field";
import { validator } from '../../const/validator';
import Notifier from "../../components/notifier";

class SetPassword extends Component {

    state = {
        token: window.location.search.split('?token=')[1],
        error: false,
        showError: false
    }

    constructor(props) {
        super(props);
        const { token } = this.state;
        API_CALL('get', 'validatetoken?token=' + token, null, null, data => {
            const { response } = data;
            if (response == 'success') {
                this.setState({ show: true })
            } else {
                this.setState({ error: true })
            }
        })
    }

    setPassword(values) {
        API_CALL('post', 'setpassword', { ...values, verifyToken: this.state.token }, null, data => {
            const { response, message } = data;
            if (response == 'success') {
                this.setState({
                    showSuccess: true
                })
            } else {
                this.setState({
                    showError: true,
                    color: 'danger',
                    message
                })
            }
        })
    }

    render() {
        const { handleSubmit } = this.props;
        const { required } = validator;
        const { show, error, showSuccess, showError, color, message } = this.state;
        if (show) {
            if (showSuccess) {
                return (
                    <div className="set-password">
                        <Row>
                            <Col xs={12} className="text-center heading">
                                Well done! Setup Password completed
                        </Col>
                            <Col xs={12} md={{ size: 4, offset: 4 }}>
                                You can <Link to="/signin" className="text-primary">Login</Link> into the application using your password.
                            </Col>
                        </Row>
                    </div>
                )
            } else {
                return (
                    <div className="set-password">
                        <Row>
                            <Col xs={12} className="text-center heading">
                                Setup Password
                        </Col>
                            <Col xs={12} md={{ size: 4, offset: 4 }}>
                                <Form onSubmit={handleSubmit(this.setPassword.bind(this))}>
                                    <FormGroup>
                                        <FormField
                                            name="New_Password"
                                            type="password"
                                            placeholder="New Password"
                                            validate={[required]}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormField
                                            name="Confirm_Password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            validate={[required]}
                                        />
                                    </FormGroup>
                                    <div className="text-center mt-4">
                                        <Button color="primary">Submit</Button>
                                    </div>
                                </Form>
                                <Notifier show={showError} color={color} message={message} />
                            </Col>
                        </Row>
                    </div>
                )
            }
        } else if (error) {
            return (
                <div className="set-password">
                    <Row>
                        <Col xs={12} className="text-center heading">
                            Sorry! something went wrong
                        </Col>
                        <Col xs={12} md={{ size: 4, offset: 4 }}>
                            <Notifier color="danger" message="Invalid token" />
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return null
        }
    }
}

export default reduxForm({
    form: 'setupPasswordForm',
    enableReinitialize: true
})(SetPassword)