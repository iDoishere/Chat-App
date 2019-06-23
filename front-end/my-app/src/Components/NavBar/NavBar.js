 
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect,Switch,Link  } from "react-router-dom";
import Register from '../../Container/Register/Register'
import Login from '../../Container/Login/Login'

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
          isOpen: false
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
      } = this.props;
        return (
            <div>
                 <Router>
                <Navbar color="light" light expand="md">
             <NavbarBrand  >  <p className="a11">Chat App</p>
             </NavbarBrand>
             <NavbarToggler onClick={this.toggle} />
             <Collapse isOpen={this.state.isOpen} navbar>
               <Nav className="ml-auto" navbar>
                 <div className="all">
                   <div className="item1">
                     <NavItem>
                     <Link to="/Login/">Login</Link>
                     </NavItem>
                   </div>
                   <div className="item2">
                     <NavItem>
                     <Link to="/Register/">Register</Link>
                     </NavItem>
                   </div>
                   <div className="item3">
                     <NavItem>
                      <div >
                         {/* <Link to="/Login">
                           <div>
                             <p  className="btnsNavbar" >
                               Sighout</p>
                           </div>
                         </Link> */}
                       </div>
                     </NavItem>
                   </div>
                 </div>
               </Nav>
             </Collapse>
           </Navbar>
           
           <Route exact path='/Register/' render={() => {
              return (           
                      <div>
                        <Register   clickedRegister={clickedRegister}/>
                      </div>
                        )}}/>   
               <Route path="/Login/"  exact component={Login} />  
           </Router>
            </div>
        )
    }
}
export default  NavBar;