
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './NavBar.css'
import {Collapse,Navbar,NavbarToggler,NavbarBrand, Nav,NavItem,} from 'reactstrap';
import { MDBIcon } from 'mdbreact';
 

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
     
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { 
      ifUserLoggedIn,
       userLoggedOut,   
      openModalBtn,
      usersLength
    } = this.props;
    const linkName = ifUserLoggedIn ? "Logout" : "Login";   
    return (
      <div>
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Chat App</NavbarBrand>
         {ifUserLoggedIn ? 
          <div className="container2">
          <div onClick={openModalBtn}  className="btn btn-two">
            <span>{usersLength} Onlinsse Users</span>
          </div>
        </div>:[]}  
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
       <div className="allItems">
            <NavItem> 
               <Link     to="/" onClick={userLoggedOut}>  
               <MDBIcon icon="arrow-circle-right mdb-gallery-view-icon" />
               {linkName}</Link>       
           </NavItem>
              <NavItem>   
                  <Link to="/Register/">
                  <MDBIcon icon="child mdb-gallery-view-icon" />
                    Register</Link>    
              </NavItem> 
             </div>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
export default NavBar;


