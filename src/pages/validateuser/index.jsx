import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom'

import Notifier from "./../../components/notifier";
import API_CALL from './../../services'
import './style.scss';

export class ValidateUser extends Component {
    state = {
        token: window.location.search.split('?token=')[1],
        error: false,
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

    render() {
        const { show, error } = this.state;
        if (show) {
            return (
                <div className="set-password">
                    <Row>
                        <Col xs={12} className="text-center heading">
                            Superb! your email is verified successfully.
                        </Col>
                        <Col xs={12} md={{ size: 4, offset: 4 }}>
                            You can <Link to="/signin" className="text-primary">Login</Link> into the application using your password.
                            </Col>
                    </Row>
                </div>
            )
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

export default ValidateUser
