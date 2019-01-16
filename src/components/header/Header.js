import React, { Component } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import "./Header.css";

import logo from "./../../assets/img/logo-new.png";

class Header extends Component {
    constructor(props) {
        super(props);
    
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
            <header>
                <Navbar color="light" light fixed="top" expand="md">
                    <div className="container">
                        <NavbarBrand href="/">
                            <img src={logo} className="Header-logo" alt="logo" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/home">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/components">Our Services</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="tel:+919360933933">+91 9360933933</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </header>
        )
    }
}

export default Header;