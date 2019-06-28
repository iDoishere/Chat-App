 
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect,Switch,Link  } from "react-router-dom";
 import './NavBar.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
  } from 'reactstrap';
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          userName: localStorage.getItem("userdetails"),
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
      const {
        clickedRegister
        ,ifUserLoggedIn
        ,userLoggedOut
      } = this.props;

      const linkName =  ifUserLoggedIn ? "Logout" : "Login";
        return (
            <div>
           
            <Navbar color="light" light expand="md">
             <NavbarBrand >  <p className="a11">Chat App</p>
             </NavbarBrand>
           
             <NavbarToggler onClick={this.toggle} />
             <Collapse isOpen={this.state.isOpen} navbar>
               <Nav className="ml-auto" navbar>
                 <div className="all">
                   <div className="item1">
                     <NavItem>
                     <Link to="/" onClick = {userLoggedOut}>{linkName}</Link>
                     </NavItem>
                   </div>
                   <div className="item2">
                     <NavItem>
                     <Link to="/Register/">Register</Link>
                     </NavItem>
                   </div>
                 </div>
               </Nav>
             </Collapse>
           </Navbar>   
            </div>
        )
    }
}
export default  NavBar;