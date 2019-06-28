import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,MDBIcon,MDBCardHeader } from 'mdbreact';
import './Login.css'
import {LOGIN} from '../../Events'
import socketIOClient from 'socket.io-client';
import LightBox from '../../Components/LightBox/LightBox'
import {PostDataToMongo,getDataFromMongo} from '../MainApp/PostData'
 
class Login extends Component {
  serverUrl   = 'http://localhost:3000';
    constructor(props) {
        super(props)
        this.state = {     
          password:"",
          name:"",
          ifUserLoggedIn:false,
          banner : {
             isDisplayed: false, msgToUser: "", color: ''   
          }
          
        };
      }
  
   
    
         getPass = (event)  => {
            this.setState({password:event.target.value})
         }
         getName = (event)  => {
          this.setState({name:event.target.value})
          }
          


          showBanner = (msg,color) => {
            const banner = { isDisplayed: true, msg, color};
            this.setState({ banner });
            this.bannerTimeOut = setTimeout(() => {
                const banner = { isDisplayed: false, msg: "", color: null };
                this.setState({ banner })
            }, 3000);
        }
    render() { 
     
        const {
          loginUser
        } = this.props ;       
        return (  
          <div  >

      <MDBContainer >
            <MDBRow className="divLogin">
              <MDBCol md="6">
                <form  > 
                  <h2>Sign in</h2>
                  <div className="grey-text">
                  <MDBInput   onChange = {this.getName}
                      label="Type your name"
                      icon="envelope"
                      group
                      type="text"
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
                      const name = this.state.name;
                      const password = this.state.password;
                      const User = {password:password,name:name}              
                         loginUser(User)}}>Login</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        {/* {
          
          this.state.banner.isDisplayed ?  <LightBox
          
          info={this.state.banner}
          /> : ''
        }
          */}
          </div>
     
        )
    }
}
export default  Login;