import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import standingNinja from "./../../assets/img/standing-ninja.png";
import './Book.css';
import ServiceForm from "./form";

class Book extends Component {
    bookService(data) {
        console.log(data);
    }
    render() {
        return (
            <Row className="book">
                <Col xs={12}>
                    <h1 className="text-center heading">Book a Service</h1>
                </Col>
                <Col xs={12}>
                    <Row>
                        <Col xs={12} sm={3} md={6} className="text-center ninja">
                            <img src={standingNinja} alt="ninja" />
                        </Col>
                        <Col xs={12} sm={9} md={6}>
                            <h4 className="text-center font-weight-light">Fill up & get ninjafied</h4>
                            <hr/>
                            <ServiceForm getValues={(values)=>this.bookService(values)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Book;