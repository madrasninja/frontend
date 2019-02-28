import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import _ from "lodash";
import { Link } from "react-router-dom";

import homeCleaning from './../../assets/img/home-cleaning.jpg';
import kitchenCleaning from './../../assets/img/kitchen-cleaning.jpg';
import carpetCleaning from './../../assets/img/carpet-cleaning.jpg';
import restroomCleaning from './../../assets/img/restroom-cleaning.jpg';
import sofaCleaning from './../../assets/img/sofa-cleaning.jpg';
import marblePolishing from './../../assets/img/marble-polishing.jpg';
import './OurServices.scss';

class OurServices extends Component {
    constructor() {
        super();
        this.state = {
            services: [
                {
                    title: 'Home Cleaning',
                    bgimg: homeCleaning,
                    description: 'Ninja will take care of your day today home cleaning tasks. Ninja trained in providing regular conventional and environmentally friendly cleaning for kitchen, lobbies, hallways and more',
                }, {
                    title: 'Carpet Cleaning',
                    bgimg: carpetCleaning,
                    description: 'Ninja will safeguard our customers from bacterias which stays in the carpet. Ninja trained in cleaning any carpet material, rugs, mattress, curtains and quick drying within a fraction of seconds',
                }, {
                    title: 'Bathroom Cleaning',
                    bgimg: restroomCleaning,
                    description: 'Ninja will thoroughly clean the toilet inside and out to disinfect. Ninja trained in scrubbing and rinsing the sinks, showers, and tubs and to remove scums in the bathroom, making fixtures shine',
                }, {
                    title: 'Kitchen Cleaning',
                    bgimg: kitchenCleaning,
                    description: 'Ninja provides thorough disinfect, clean and shine surface in your kitchen. Ninja trained in cleaning stove drip pans, sweep and mop floors leaving your kitchen professionally clean and smelling fresh',
                }, {
                    title: 'Sofa Cleaning',
                    bgimg: sofaCleaning,
                    description: 'Ninja is specialized in restoring the beauty of your sofa and furniture. Ninja trained in removing dust and allergens from sofas, chairs, and other upholstered items that can lead to a healthier environment',
                }, {
                    title: 'Marble Polishing',
                    bgimg: marblePolishing,
                    description: 'Ninja adds brilliant shine to your marble flooring by restoring the shine of the marble floor. Ninja trained in removing top-level dirt, scuff marks and scratches without creating any mess',
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
                        <h5>{data.title}</h5>
                        <p className="text-black-50 text-justify">{data.description}</p>
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
                        <h3 className="text-center heading">Our Services</h3>
                    </Col>
                    <Col xs={12}>
                        <Row>
                            {this.renderServiceCards(this.state.services)}
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <div className="text-center promotion">
                            <h3 className="text-black-50">Don't waste your quality time cleaning. Let us take care of it.</h3>
                            <Link to='/book'><Button color="primary" size="lg">Book a Service</Button></Link>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OurServices;