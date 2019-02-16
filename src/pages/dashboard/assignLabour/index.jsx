import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssignLabourForm from './form';


class AssignLabour extends Component {
    render() {
        return (
            <div>
                <AssignLabourForm bookingId={this.props.bookingId} />
            </div>
        );
    }
}

export default connect(
    null,
)(AssignLabour);