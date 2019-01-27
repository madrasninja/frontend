import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <Row className="dashboard">
                <Col xs={12} className="heading">
                    <h3>Hi, Sivachandran</h3>
                </Col>
                <Col xs={12}>
                    
                </Col>
            </Row>
        );
    }
}

export default Dashboard;