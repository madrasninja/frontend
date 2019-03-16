import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './Banner.scss';

class Banner extends Component {
	render() {
		return (
			<div className="Banner">
				<div className="content container">
					<h2>One Stop Destination For All Your Cleaning Service Needs</h2>
					<p>Home - Restroom - Kitchen - Office</p>
					<Link to="/book">
						<Button color="primary">Book Your Service</Button>
					</Link>
				</div>
			</div>
		);
	}
}

export default Banner;
