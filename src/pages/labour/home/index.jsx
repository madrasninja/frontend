import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, CardText, CardFooter, Button } from "reactstrap";
import _ from "lodash";
import moment from "moment";

import { getLabourList } from "./../../../services/LabourList";

class LabourHome extends Component {

    constructor(props) {
        super(props);
        props.getLabourList();
    }

    renderList(list) {
        if (list.data) {
            return _.map(list.data, (data, index) => {
                return (
                    <Col xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardBody>
                                <CardTitle className="">
                                    <span className="text-capitalize">
                                        {data.First_Name} {data.Last_Name}
                                    </span>
                                    <br />
                                    <small>{moment(data.Service_Time.From, 'hh:mm').format('hh:mmA')} - {moment(data.Service_Time.To, 'hh:mm').format('hh:mmA')}</small>
                                </CardTitle>
                                <CardText className="text-black-50">
                                    {data.service_type.name} at {data.locality.name}<br />
                                    {data.Mobile_Number}
                                </CardText>
                            </CardBody>
                            <CardFooter>
                                <Link to={'/labour/update/' + data._id}><Button className="float-right" color="primary" size="sm">Update</Button></Link>
                            </CardFooter>
                        </Card>
                    </Col>
                )
            })
        }
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Row>
                        {this.renderList(this.props.labourList)}
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default connect((reduxData) => {
    return {
        labourList: reduxData.LabourList
    }
}, { getLabourList })(LabourHome);