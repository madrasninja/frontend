import React, { Component } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Header.scss";
import logo from "./../../assets/img/logo.png";
import cookie from "react-cookies";

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

    renderMenu = () => {
        if (cookie.load('session')) {
            const {First_Name} = this.props.userData;
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/services" className="nav-link">Our Services</Link>
                    </NavItem>
                    <NavItem>
                        <NavLink href="tel:+919360933933">+91 9360933933</NavLink>
                    </NavItem>
                    <NavItem>
                        <Link to="/book" className="nav-link">Book</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {First_Name}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <Link to="/dashboard">Dashboard</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/labour/home">Labour Management</Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => {
                                    cookie.remove('session');
                                    window.location.reload();
                                }}>Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )
        } else {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/services" className="nav-link">Our Services</Link>
                    </NavItem>
                    <NavItem>
                        <NavLink href="tel:+919360933933">+91 9360933933</NavLink>
                    </NavItem>
                    <NavItem>
                        <Link to="/book" className="nav-link">Book</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/signin" className="nav-link">LOGIN</Link>
                    </NavItem>
                </Nav>
            )
        }
    }

    render() {
        return (
            <header>
                <Navbar color="light" light fixed="top" expand="md">
                    <div className="container">
                        <Link to="/" className="navbar-brand"><img src={logo} className="Header-logo" alt="logo" /></Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {this.renderMenu()}
                        </Collapse>
                    </div>
                </Navbar>
            </header>
        )
    }
}

export default connect(reduxData=>{
    return {
        userData: reduxData.UserDetails.data
    }
}, {})(Header);