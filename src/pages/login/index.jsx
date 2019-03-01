import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import cookie from "react-cookies";
 
import LoginForm from "./form";

import './style.scss';

export default class Login extends Component {

    apicall = data => {
        console.log(data)
        cookie.save('session', true, {path: '/'});
        window.location.reload();
    }
    render() {
        return (
            <div className="login">
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="">
                            Welcome Back
                        </h3>
                        <p className="text-black-50">One login for all the services</p>
                    </Col>
                    <Col xs={12} md={{ size: 4, offset: 4 }}>
                        <LoginForm getValues={(data)=> this.apicall(data)} />
                    </Col>
                    <Col xs={12} className="add-on text-center">
                        <h6 className="text-primary">Forgot Password?</h6>
                    </Col>
                    <Col xs={12} className="add-on text-center">
                        New to Madrasninja? <span className="text-primary">Join Now</span>
                    </Col>
                </Row>
            </div>
        );
    }
}