import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import Banner from './../banner/Banner';
import WorkFlow from "./work-flow/WorkFlow";
import './Home.css';
import OurServices from "../our-services/OurServices";
import sittingNinja from './../../assets/img/sitting-ninja.png';

class Home extends Component {
    
    render() {
        return (
            <Row className="Home">
                <Col xs={12} style={{padding: '0px'}}>
                    <Banner />
                </Col>
                <Col xs={12} className="description">
                    <img src={sittingNinja} className="img" alt="icon"/><br/>
                    <hr/>
                    Madras Ninja is the first-of-its-kind cleaning service provider in Chennai. We provide a multitude of cleaning services from home to office. 
                    You just have to pick your available date and time according to your convenience to avail the service.
                </Col>
                <Col xs={12}>
                    <WorkFlow />
                </Col>
                <Col xs={12}>
                    <OurServices />
                </Col>
            </Row>
        );
    }
}

export default Home;