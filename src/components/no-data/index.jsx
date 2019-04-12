import React, { Component } from 'react';

import './style.scss';

export default class NoData extends Component {
	render() {
		const { message } = this.props;
		return <div className="no-data">{message}</div>;
	}
}
