import React from 'react';
import { Row, Col } from 'reactstrap';

import standingNinja from './../../../assets/img/standing-ninja.png';
import lookingNinja from './../../../assets/img/looking-ninja.png';
import arrivedNinja from './../../../assets/img/arrived-ninja.png';
import './WorkFlow.scss';

const WorkFlow = () => {
	return (
		<Row className="work-flow-block">
			<Col xs={12} className="heading">
				How to hire a Ninja?
			</Col>
			<Col xs={12}>
				<Row>
					<Col xs={12} sm={12} md={4}>
						<div className="inner-block">
							<div className="heading">
								<img src={standingNinja} alt="WorkFlow_icon" />
							</div>
							<div className="body">
								<ul>
									<li>
										Click on <strong>Book Your Service</strong>
									</li>
									<li>Select your preferred cleaning service</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col xs={12} sm={12} md={4}>
						<div className="inner-block">
							<div className="heading">
								<img src={lookingNinja} alt="WorkFlow_icon" />
							</div>
							<div className="body">
								<ul>
									<li>Pick the date and time</li>
									<li>Select the number of hours</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col xs={12} sm={12} md={4}>
						<div className="inner-block">
							<div className="heading">
								<img src={arrivedNinja} alt="WorkFlow_icon" />
							</div>
							<div className="body">
								<ul>
									<li>Pay your fare</li>
									<li>Sit back, relax & Get Ninjafied!</li>
								</ul>
							</div>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default WorkFlow;
