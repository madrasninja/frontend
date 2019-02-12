import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";

import standingNinja from "./../../assets/img/standing-ninja.png";
import './Book.scss';
import ServiceForm from "./form";
import { bookService } from "./../../services/BookService";
import Notifier from "../../components/notifier/Notifier";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseStatus: false
        }
    }

    bookaService(values) {
        values.Session_Time = {
            From: values.serviceDate + values.serviceTime,
            To: moment(values.serviceDate).hours(values.serviceTime.split(':')[0]).minutes(values.serviceTime.split(':')[1]).add(values.serviceHours, 'h')
        }
        this.props.bookService(values);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.formResponse !== nextProps.formResponse) {
            let {message, response} = nextProps.formResponse.data;
            if (response === 'success') {
                this.setState({
                    responseStatus: true,
                    message
                })
            }
        }
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
                            <img src={standingNinja} alt="ninja"/>
                        </Col>
                        <Col xs={12} sm={9} md={{size: 4, offset: 1}}>
                            <h4 className="text-center font-weight-light">Fill up & get ninjafied</h4>
                            <hr/>
                            <Notifier message={this.state.message} color="success" show={this.state.responseStatus}/>
                            <ServiceForm getValues={(values)=>this.bookaService(values)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(reduxData) {
    return {
        formResponse: reduxData.BookService
    }
}

export default connect(mapStateToProps, {
    bookService
})(Book);