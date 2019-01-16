import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import './WorkFlow.css';

class WorkFlow extends Component {
    render() {
        return (
            <Row className="work-flow-block">
                <Col xs={12} className="heading">How to hire a Ninja?</Col>
                <Col xs={12}>
                    <Row>
                        <Col xs={12} sm={12} md={4}> 
                            <div className="inner-block">
                                <div className="heading">
                                    1
                                </div>
                                <div className="body">
                                    <ul>
                                        <li>Just Click the Book Now</li>
                                        <li>Select the type of cleaning service</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <div className="inner-block">
                                <div className="heading">
                                    2
                                </div>
                                <div className="body">
                                    <ul>
                                        <li>Pick the Date & Time</li>
                                        <li>Select the hours of service</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <div className="inner-block">
                                <div className="heading">
                                    3
                                </div>
                                <div className="body">
                                    <ul>
                                        <li>Calculate the Fare of Ninja</li>
                                        <li>Pay it wisely & Get Ninjafied</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default WorkFlow;