import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon, MDBCardHeader, MDBCard, MDBCardBody } from 'mdbreact';
import './Login.css'
import LightBox from '../../Components/LightBox/LightBox'

class Login extends Component {
    serverUrl   = window.location.origin;
 //serverUrl = 'http://localhost:8080';
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      name: "",
      ifUserLoggedIn: false,
      banner: {
        show: false, msgToUser: "", color: ''
      },
    };

  }
  // user pressed login 
  loginUser = (user) => {
    if (user.name === "" || user.password === "") {
      this.displayLightBox("please fill in all fields", '0');
      return;
    }

    const url = this.serverUrl + "/users/login";
    const auth = `Basic ${btoa(`${user.name}:${user.password}`)}`;
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        Authorization: auth
      })
    }).then(res => res.json())
      .then(res => {
        if (res.autorized) {
          this.props.userLoggedIn(user.name) // func in main app ..user will transfer to chat page
        }
      })
      .catch(err => {
        this.displayLightBox("failed to login", '0');
      });
  }

  getPass = (event) => {
    this.setState({ password: event.target.value })
  }

  getName = (event) => {
    this.setState({ name: event.target.value })
  }
  // display error \ warning to user
  displayLightBox = (msgToUser, color) => {
    const banner = { show: true, msgToUser, color };
    this.setState({ banner });
    this.bannerTimeOut = setTimeout(() => {
      const banner = { show: false, msgToUser: "", color: null };
      this.setState({ banner })
    }, 3000);
  }

  //clear timeout as page die 
  componentWillUnmount() {
    clearTimeout(this.bannerTimeOut);
  }

  render() {
    return (
      <div >
        <MDBContainer>
          <MDBRow className="divLogin">
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="lock" /> Login:
                </h3>
                  </MDBCardHeader>
                  <form>
                    <div className="grey-text">
                      <MDBInput onChange={this.getName}
                        label="Type your name"
                        icon="envelope"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput onChange={this.getPass}
                        label="Type your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                      />
                    </div>
                    <div className="text-center mt-4">
                      <MDBBtn outline color="info" onClick={() => {
                        const name = this.state.name;
                        const password = this.state.password;
                        const User = { password: password, name: name }
                        this.loginUser(User)
                      }}>
                        Send
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
export default Login;