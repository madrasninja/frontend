import React, { Component } from "react";
import {
    Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, CardFooter, Button,
    Modal, ModalHeader
} from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

import AssignLabour from './assignLabour/index';
import { getBookingList } from "./../../services/BookingList";
import './Dashboard.scss';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        props.getBookingList();
        this.state = {
            list: [],
            modal: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.list != nextProps.list) {
            this.setState({
                list: nextProps.list.data
            })
        }
    }

    findDiff = (from, to) => {
        return moment(to, 'DD/MM/YYYY HH:mm').diff(moment(from, 'DD/MM/YYYY HH:mm'), 'hours')
    }

    toggle = (data) => {
        this.setState({
            bookingId: data.ID,
            modal: !this.state.modal
        })
    }

    renderAction = (data) => {
        const {_id} = data.status;
        if (_id == 0) {
            return <Button color="primary" size="sm" className="float-right" onClick={() => this.toggle(data)}>Assign</Button>;
        } else if (_id == 2) {
            return <Button color="success" size="sm" className="float-right">Assigned</Button>
        }
    }

    renderList(list) {
        return _.map(list, (data, index) => {
            let hour = this.findDiff(data.Session_Time.From, data.Session_Time.To);
            return (
                <Col xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardBody>
                            <CardTitle className="">
                                {data.service_type.name} at {data.locality.name}<br />
                                <small>{moment(data.Session_Time.From, 'DD/MM/YYYY HH:mm').format('hh:mmA DD/MM/YYYY')} - {hour} {hour > 1 ? 'Hours' : 'Hour'}</small>
                            </CardTitle>
                            <CardText className="text-black-50">
                                <span className="text-capitalize">
                                    {data.user.First_Name} {data.user.Last_Name}
                                </span><br />
                                <small>
                                    {data.Address}<br />
                                    {data.user.Mobile_Number}
                                </small>
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            {data.ID}
                            {this.renderAction(data)}
                        </CardFooter>
                    </Card>
                </Col>
            )
        })
    }

    render() {
        const { bookingId } = this.state;
        return (
            <Row className="dashboard">
                <Col xs={12} className="heading">
                    <h3>Bookings</h3>
                </Col>
                <Col xs={12} className="content">
                    <Row>
                        {this.renderList(this.state.list)}
                    </Row>
                </Col>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Assign Labour</ModalHeader>
                    <AssignLabour bookingId={bookingId} />
                </Modal>
            </Row>
        );
    }
}

export default connect((reduxData) => {
    return {
        list: reduxData.BookingList
    }
}, { getBookingList })(Dashboard);