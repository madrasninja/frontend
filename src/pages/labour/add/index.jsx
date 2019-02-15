import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

import { savelabour } from "./../../../services/SaveLabour";
import AddForm from "./form";
import Notifier from "./../../../components/notifier";

class AddLabour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseStatus: false
        }
    }

    save(data) {
        this.props.savelabour(data);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.formResponse !== nextProps.formResponse) {
            let { message, response } = nextProps.formResponse.data;
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
            <Row>
                <Col xs={12} sm={12} md={{size: 6, offset: 3}}>
                    <h3 className="text-center">Add Labour</h3>
                    <hr/>
                    <Notifier message={this.state.message} color="success" show={this.state.responseStatus} />
                    <AddForm getValues={(values)=>this.save(values)}/>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(reduxData) {
    return {
        formResponse: reduxData.SaveLabour
    }
}

export default connect(mapStateToProps, {savelabour})(AddLabour);