import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Banner from './../../components/banner/Banner';
import WorkFlow from './work-flow/WorkFlow';
import './Home.scss';
import OurServices from './../../pages/our-services/OurServices';
import sittingNinja from './../../assets/img/sitting-ninja.png';

class Home extends Component {
	render() {
		return (
			<Row className="Home">
				<Col xs={12} style={{ padding: '0px' }}>
					<Banner />
				</Col>
				<Col xs={12} className="description">
					<img src={sittingNinja} className="img" alt="icon" />
					<br />
					<hr />
					<h5>
						Madras Ninja is the first-of-its-kind cleaning service provider in Chennai. We provide a
						multitude of cleaning services from home to office. You just have to pick your available date
						and time according to your convenience to avail the service.
					</h5>
				</Col>
				<Col xs={12}>
					<WorkFlow />
				</Col>
				<Col xs={12}>
					<Row className="content-block">
						<Col sm={{ size: 8 }} className="align-self-center">
							<div className="title">About</div>
							<div className="content left">
								Madras Ninja is the platform for connecting individuals looking for household services
								with top-quality, pre-screened independent service professionals. From home cleaning to
								handyman services, Madras Ninja instantly matches lot of customers every week with
								trusted professionals in Chennai. With a seamless booking process, secure payment, and a
								100% money-back guarantee, Madras Ninja is the easiest, most convenient way to book home
								services.
							</div>
						</Col>
						<Col sm={4} className="d-none d-sm-block align-self-center">
							<img src="https://image.freepik.com/free-photo/close-up-woman-s-hand-holding-bucket-with-cleaning-supplies-pink-napkin_23-2147916411.jpg" />
						</Col>
					</Row>
					<Row className="content-block">
						<Col sm={4} className="d-none d-sm-block align-self-center">
							<img src="https://image.freepik.com/free-photo/closeup-hands-wearing-gloves-cleaning-sink-faucet-domestic-chores-concept_53876-14720.jpg" />
						</Col>
						<Col sm={{ size: 8 }} className="align-self-center">
							<div className="title">Experienced</div>
							<div className="content left">
								Cleaning is just removing the first layer of dust from a surface but making a place
								shine is something ahead of cleaning and that’s what we at Madras Ninja work hard for
								from 2009. We ensure the quality services through attention to detail and outstanding
								customer services. We will deploy professional cleaners who will make your place clean
								and healthy to the shining standard you deserve. We protect your family and environment
								by using only eco-friendly products.
							</div>
						</Col>
					</Row>
					<Row className="content-block">
						<Col sm={{ size: 8 }} className="align-self-center">
							<div className="title">Expertise</div>
							<div className="content left">
								Having strong work ethics and exceptional cleaning methods, We provide skilled maids.
								Our Cleaning maids are trained with efficient cleaning techniques and will provide
								individualized attention to meet your specific needs. Our team is trained in the care
								and treatment of different materials. We will ensure the best quality, visually
								appealing results, the best services and the personal attention to the details you want.
							</div>
						</Col>
						<Col sm={4} className="d-none d-sm-block align-self-center">
							<img src="https://image.freepik.com/free-photo/garage-gate-water-cleaning_1426-1496.jpg" />
						</Col>
					</Row>
					<Row className="content-block">
						<Col sm={4} className="d-none d-sm-block align-self-center">
							<img src="https://image.freepik.com/free-photo/payment-terminal-besides-spray-bottle-rubber-gloves_1088-1108.jpg" />
						</Col>
						<Col sm={{ size: 8 }} className="align-self-center">
							<div className="title">Custom Scheduling</div>
							<div className="content left">
								Ninja works as per your schedule that works best for your household. You may choose to
								have our cleaning services weekly, biweekly or bimonthly or just for that special
								occasion that suddenly comes up. Ninjas are available between the hours of 9 AM to 9 PM,
								7 days a week.
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<OurServices />
				</Col>
			</Row>
		);
	}
}

export default Home;
