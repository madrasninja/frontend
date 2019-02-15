import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class LabourHome extends Component {

    render() {
        return (
            <Row>
                <Col xs={12} className="stats">
                    <Row>
                        <Col xs={6} md={4} className="text-center text-uppercase" >
                            <h1>5</h1>
                            <p>New</p>
                        </Col>
                        <Col xs={6} md={4} className="text-center text-uppercase" >
                            <h1>15</h1>
                            <p>Pending for verification</p>
                        </Col>
                        <Col xs={6} md={4} className="text-center text-uppercase" >
                            <h1>51</h1>
                            <p>Verified</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default LabourHome;