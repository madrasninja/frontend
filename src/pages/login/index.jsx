import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
 
import LoginForm from "./form";

import API_CALL from "../../services";

import './style.scss';

export default class Login extends Component {

    apicall = data => {
        API_CALL('post', 'login', data, null, data=>{
            if (data.result == "success") {
                cookie.save('session', data.accessToken, {path: '/'}); 
                window.location.reload();
            }
        })
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
                        New to Madrasninja? <Link to="/signup">Join Now</Link>
                    </Col>
                </Row>
            </div>
        );
    }
}