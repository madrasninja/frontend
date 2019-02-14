import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import './Labour.scss';

class Labour extends Component {
    
    render() {
        return (
            <Row className="labour">
                <Col xs={12}>
                    <Row>
                        <Col xs={6} md={4} className="text-center text-uppercase" >
                            <h1>5</h1>
                            <p>New</p>
                        </Col>
                        <Col xs={6} md={4} className="text-center text-uppercase" >
                            <h1>15</h1>
                            <p>Pending</p>
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

export default Labour;