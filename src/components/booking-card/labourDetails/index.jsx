import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    ModalBody,
    Spinner
} from 'reactstrap';

import { getLabourForBooking } from '../../../services/LabourListForBooking';
import avatarLogo from '../../../assets/img/user.svg';

import './style.scss';

class LabourDetails extends Component {

    renderEmpInfo = () => {
        const { labourDetails } = this.props;

        let info = _.map(labourDetails, (response, index) => {
            const { avatar, First_Name, Last_Name, Email_Id, } = response;
            
            return (
                <Row key={index} className="labourInfo">
                    <Col md={labourDetails.length === 1 && index === 0 ? 0 : 4} sm={12} className="text-center">
                        <img src={avatar ? avatar : avatarLogo} alt="logo" height="150" width="150" className="rounded-circle shadow" />
                        <h4 className="mt-3">{`${First_Name} ${Last_Name}`}</h4>
                        <p className="text-muted">{Email_Id}</p>
                    </Col>
                </Row>
            )
        });

        return info;
    }

    render() {
        return (
            <div>
                <ModalBody>{this.renderEmpInfo()}</ModalBody>
            </div>
        );
    }
}

const mapStateToProps = ({ labourListForBooking }) => {
    return { labourListForBooking }
}

export default connect(
    mapStateToProps, { getLabourForBooking }
)(LabourDetails);