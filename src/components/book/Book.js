import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import './Book.css';

class Book extends Component {
    render() {
        return (
            <Row className="book">
                <Col xs={12}>
                    <h1 className="text-center heading">Book a Service</h1>
                </Col>
                <Col xs={12}>
                    
                </Col>
            </Row>
        );
    }
}

export default Book;