import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import LightBox from '../../Components/LightBox/LightBox'
import { PostDataToMongo } from '../../Container/MainApp/PostData'
import  * as Events   from '../../Events'

 class Register extends Component {
 serverUrl   = window.location.origin;
 // serverUrl   = 'http://localhost:8080';
  constructor(props) {
    super(props)
    this.state = {     
      banner : {
        show: false, msgToUser: "", color: ''   
      }
      
    };
  }
  name = React.createRef();
  pass = React.createRef();
  rePass = React.createRef();


  displayLightBox = (msgToUser,color) => {
    const banner = { show: true, msgToUser, color};
    this.setState({ banner });
    this.bannerTimeOut = setTimeout(() => {
        const banner = { show: false, msgToUser: "", color: null };
        this.setState({ banner })
    }, 3000);
}

  clickedRegister = async (obj) => {
  
    const url = this.serverUrl + "/users/register";
    let resultRegsiter = await PostDataToMongo(obj, url)
 
    if (resultRegsiter.info === Events.MISSING_INPUT) {
      this.displayLightBox(resultRegsiter.info, Events.FALSE)
    }
    if (resultRegsiter.info === Events.PASSWORD_LENGTH) {
      this.displayLightBox(resultRegsiter.info, Events.FALSE)
    }
    if (resultRegsiter.info === Events.PASSWORD_MATCH) {
      this.displayLightBox(resultRegsiter.info, Events.FALSE)
    }

    if (resultRegsiter.info === Events.USER_EXITS) {
      this.displayLightBox(resultRegsiter.info, Events.FALSE)
    }
    if (resultRegsiter.info === Events.YOURE_IN) {
      this.displayLightBox(resultRegsiter.info,'1')
    }
  }
  componentWillUnmount() {
    clearTimeout(this.bannerTimeOut);
}
    render() {
        return (
            <div>
      <MDBContainer>
      <MDBRow>
        <MDBCol  >
          <MDBCard>
            <MDBCardBody>
              <form>
                <div className="grey-text">
                  <MDBInput
                   ref={this.name}
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
           
                  <MDBInput
                         ref={this.pass}
                    label="Confirm your pass"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    ref={this.rePass}
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                <MDBBtn onClick={ ()=> {            
                let name = this.name.current.state.innerValue;       
                let pass = this.pass.current.state.innerValue;
                let rePass =this.rePass.current.state.innerValue;
                const obj = {name :name ,pass:pass,rePass:rePass}
                this.clickedRegister(obj)}}
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Sign in
                </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <LightBox allinfo={this.state.banner} />
            </div>
        )
    }
}
export default Register;