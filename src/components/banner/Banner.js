import React, { Component } from "react";
import { Button } from "reactstrap";

import './Banner.css';

class Banner extends Component {
    
    render() {
        return (
            <div className="Banner">
                <div className="content container">
                    <h2>
                        Your complete cleaning destination
                    </h2>
                    <p>
                        Home - Restroom - Kitchen - Office
                    </p>
                    <Button color="primary">Book Now</Button>
                </div>
            </div>
        );
    }
}

export default Banner;