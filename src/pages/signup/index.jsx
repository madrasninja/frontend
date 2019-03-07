import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import cookie from "react-cookies";
import {Link} from "react-router-dom";
 
import SignupForm from "./form";

import API_CALL from "../../services";

import './style.scss';

export default class Signup extends Component {

    apicall = values => {
        API_CALL('post', 'signup', values, null, data=>{
            console.log(data);
        })
    }
    render() {
        return (
            <div className="login">
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="">
                            Ready to get ninjafied
                        </h3>
                        <p className="text-black-50">One account for all the services</p>
                    </Col>
                    <Col xs={12} md={{ size: 4, offset: 4 }}>
                        <SignupForm getValues={(data)=> this.apicall(data)} />
                    </Col>
                    <Col xs={12} className="add-on text-center">
                        Already have an account? <Link to="/signin">Signin</Link>
                    </Col>
                </Row>
            </div>
        );
    }
}