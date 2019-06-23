import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,MDBIcon,MDBCardHeader } from 'mdbreact';
import './Login.css'
import {LOGIN} from '../../Events'
import socketIOClient from 'socket.io-client';

import {PostDataToMongo,getDataFromMongo} from '../MainApp/PostData'
 
class Login extends Component {
  serverUrl   = 'http://localhost:3000';
    constructor(props) {
        super(props)
        this.state = {
          email:"",
          password:"",
          ifUserLoggedIn:false
       
        };
      }

        getEmail = (event)  => {
        this.setState({email:event.target.value})
        }
         
         getPass = (event)  => {
            this.setState({password:event.target.value})
         }

    render() {
        const {
          loginUser
        } = this.props ; 
        return (  
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form>
                  <p className="h5 text-center mb-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput   onChange = {this.getEmail}
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput  onChange = {this.getPass}
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn   onClick = {() => {
                     const email = this.state.email;
                     const password = this.state.password;
                      const User = {email:email,password:password}              
                         loginUser(User)}}>Login</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )
    }
}
 
export default  Login;