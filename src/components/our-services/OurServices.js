import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import _ from "lodash";

import homeCleaning from './../../assets/img/home-cleaning.jpg';
import kitchenCleaning from './../../assets/img/kitchen-cleaning.jpg';
import carpetCleaning from './../../assets/img/carpet-cleaning.jpg';
import restroomCleaning from './../../assets/img/restroom-cleaning.jpg';
import sofaCleaning from './../../assets/img/sofa-cleaning.jpg';
import marblePolishing from './../../assets/img/marble-polishing.jpg';
import './OurServices.css';

class OurServices extends Component {
    constructor() {
        super();
        this.state = {
            services: [
                {
                    title: 'Home Cleaning',
                    bgimg: homeCleaning,
                    description: 'We provide the high quality products, clean & shine',
                }, {
                    title: 'Carpet Cleaning',
                    bgimg: carpetCleaning,
                    description: 'We provide the high quality products, clean & shine',
                }, {
                    title: 'Restroom Cleaning',
                    bgimg: restroomCleaning,
                    description: 'We provide the high quality products, clean & shine',
                }, {
                    title: 'Kitchen Cleaning',
                    bgimg: kitchenCleaning,
                    description: 'We provide the high quality products, clean & shine',
                }, {
                    title: 'Sofa Cleaning',
                    bgimg: sofaCleaning,
                    description: 'We provide the high quality products, clean & shine',
                }, {
                    title: 'Marble Polishing',
                    bgimg: marblePolishing,
                    description: 'We provide the high quality products, clean & shine',
                }
            ]
        }
    }

    renderServiceCards(services) {
        return _.map(services, (data, index)=>{
            return (
                <Col xs={12} sm={6} md={4} key={index}>
                    <div className="service-card">
                        <div className="img-block" style={{backgroundImage: 'url('+ data.bgimg +')'}}></div>
                        <h4>{data.title}</h4>
                        <p className="text-black-50">{data.description}</p>
                    </div>
                </Col>
            )
        })
    }
    
    render() {
        return (
            <div className="OurServices">
                <Row>
                    <Col xs={12}>
                        <h1 className="text-center heading">Our Services</h1>
                    </Col>
                    <Col xs={12}>
                        <Row>
                            {this.renderServiceCards(this.state.services)}
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <div className="text-center promotion">
                            <h3 className="text-black-50">Don't waste your quality time cleaning. Let us take care of it.</h3>
                            <Button color="primary" size="lg">Book a Service</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OurServices;