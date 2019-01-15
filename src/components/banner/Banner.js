import React, { Component } from "react";
import { Button } from "reactstrap";

import './Banner.css';

class Banner extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="Banner">
                <h3>
                    Looking for a cleaning service at the Hourly rate?
                </h3>
                <Button color="primary">Book Now</Button>
            </div>
        );
    }
}

export default Banner;