
import React, { Component } from 'react'
import Login from '../../Container/Login/Login'
import Chat from '../Chat/Chat'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Register from '../Register/Register'
import NavBar from '../../Components/NavBar/NavBar'
import socketIOClient from 'socket.io-client';

class MainApp extends Component {

  endpoint = 'http://localhost:8080';//socket

  constructor(props) {
    super(props)
    this.state = {
      name: '', //user name
      socket:'',
      modal: false,   //modal open or close
      ifUserLoggedIn: localStorage.getItem("ifOnline") || false,
      // display warning for users
      box: {
        show: false, msgToUser: ""
      }
    };
    this.toggle = this.toggle.bind(this); // for modal 
  }


  componentDidMount(){
    const socket = socketIOClient(this.endpoint);

    this.setState({socket:socket})
  }

  // bind the function 
  toggle() {
    this.setState({ modal: false })
  }
  // open the function
  openModalBtn = () => {
     
    this.setState({ modal: true })
  }
  //function from login, exucte after login authorization.
  userLoggedIn = (name) => {
    let ifOnline = true;
    localStorage.setItem('userdetails', name);
    localStorage.setItem('ifOnline', ifOnline);
    this.setState({ ifUserLoggedIn: true, name: name })

  }

  //user logs out
  userLoggedOut =  () => {
  
    this.state.socket
    .emit('log out', { user: this.state.name })
    localStorage.removeItem("userdetails");
    localStorage.removeItem("ifOnline");
    this.setState({ ifUserLoggedIn: false, name: '' });
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar ifUserLoggedIn={this.state.ifUserLoggedIn} userLoggedOut={this.userLoggedOut}  />
          <Route path="/Register/" exact render={() => <Register
            clickedRegister={this.clickedRegister} allinfo={this.state.box} />} />

          <Route path="/Chat/" exact render={() => <Chat openModal={this.state.modal}  openModalBtn={this.openModalBtn} toggle={() => this.toggle()} />} />

          <Route path="/" exact render={() => (
            this.state.ifUserLoggedIn ? (<Redirect to='/Chat/' />) :
              (<Login userLoggedIn={this.userLoggedIn} />)

          )} />
        </Router>
      </div>
    )
  }
}
export default MainApp;