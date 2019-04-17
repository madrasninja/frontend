import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Notifier from '../../components/notifier';
import ChangePasswordForm from './form';
import API_CALL from '../../services';

class ChangePassword extends Component {
    state = {
        color: 'primary',
        message: '',
        notifier: false
    };

    apicall = data => {        
        API_CALL('post', 'changepassword', data, null, (data) => {
            const { code, message } = data;
            if (code == 'MNS028') {
                this.setState({
                    notifier: true,
                    color: 'info',
                    message: 'Your password has been changed successfully.'
                });
            } else {
                this.setState({
                    color: 'danger',
                    message: message,
                    notifier: true
                });
            }
        });
    };

    render() {
        const { color, message, notifier } = this.state;

        return (
            <div className="login">
                <Row>
                    <Col xs={12} className="text-center">
                        <h3>Change Password</h3>
                        <p className="text-black-50">Change your password here</p>
                    </Col>
                    <Col xs={12} md={{ size: 4, offset: 4 }}>
                        <ChangePasswordForm getValues={(data) => this.apicall(data)} />
                        <Notifier color={color} message={message} show={notifier} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChangePassword;