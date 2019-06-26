import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';


 class Register extends Component {
  name = React.createRef();
  pass = React.createRef();
  rePass = React.createRef();
    render() {
      const {
        clickedRegister
    } = this.props;
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
                clickedRegister(obj)}}
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
            </div>
        )
    }
}
export default Register;