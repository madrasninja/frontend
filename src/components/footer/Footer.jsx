import React, { Component } from "react";
import {
    Navbar,
    Row,
    Col
} from 'reactstrap';

import "./Footer.scss";

class Footer extends Component {
    render() {
        return (
            <footer>
                <Navbar color="dark" expand="md">
                    <div className="container">
                        <Col xs={12}>
                            <Row>
                                <Col xs={12} sm={12} md={9}>
                                    <h5>About us</h5>
                                    <p>We are the first team in the Chennai providing the house keeping service at the hourly pricing.</p>
                                    <h5>Also connect through</h5>
                                    <p className="text-white-50">
                                        madrasninja@gmail.com<br/>+91 9360933933
                                    </p>
                                </Col>
                                <Col xs={12} sm={12} md={3}>
                                    <h5>Company</h5>
                                    <p className="text-white-50">
                                        About us<br/>
                                        Privacy Policy<br/>
                                        Blog
                                    </p>
                                    <h5>Connect with us</h5>
                                    <p className="text-white-50">
                                        Facebook<br/>
                                        Twitter<br/>
                                        Instagram
                                    </p>
                                </Col>
                                <Col xs={12} className="text-center">
                                    &copy; 2019 Madras Ninja - Professional house keeping service. All rights reserved.
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </Navbar>
            </footer>
        );
    }
}

export default Footer;