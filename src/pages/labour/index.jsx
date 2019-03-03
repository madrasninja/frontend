import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import {
    Row, Col, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from "reactstrap";

import AddLabour from './add';
import UpdateLabour from './update';
import LabourHome from "./home";
import './Labour.scss';

class Labour extends Component {
    constructor() {
        super()
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Row className="labour">
                <Col xs={12} className="header">
                    <Navbar color="transparent" light expand="md">
                        <Link to="/labour/home">
                            <NavbarBrand>
                                Labour Management
                            </NavbarBrand>
                        </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link to="/labour/add" className="nav-link">Add</Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Col>
                <Col xs={12}>
                    <Switch>
                        <Route path='/labour/add' component={AddLabour} />
                        <Route path='/labour/home' component={LabourHome} />
                        <Route path='/labour/update/:id' component={UpdateLabour} />
                        <Redirect to='/labour/home' />
                    </Switch>
                </Col>
            </Row>
        );
    }
}

export default Labour;