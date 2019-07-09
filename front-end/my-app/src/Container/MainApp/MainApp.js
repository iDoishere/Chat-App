
import React, { Component } from 'react'
import Login from '../../Container/Login/Login'
import Chat from '../Chat/Chat'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Register from '../Register/Register'
import NavBar from '../../Components/NavBar/NavBar'
import socketIOClient from 'socket.io-client';
import { func } from 'prop-types';

class MainApp extends Component {

  //endpoint = 'http://localhost:8080';//socket
  
   endpoint = window.location.origin;  //socket
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
      },
      socket:'',
      numOfUers:0
    };
    this.toggle = this.toggle.bind(this); // for modal 
  }


  componentDidMount(){
   const socket = socketIOClient(this.endpoint);
   socket
   .on('get users', data => {  
     this.setState({ numOfUers: data.length  });
   });
   this.setState({socket:socket})

  }
  toggle() {
    this.setState({ modal: false })
  }
 
  openModalBtn = () => { 
    this.setState({ modal: true })
  }

  userLoggedIn = (name) => {
    let ifOnline = true;
    localStorage.setItem('userdetails', name);
    localStorage.setItem('ifOnline', ifOnline);
    this.setState({ ifUserLoggedIn: true, name: name,numOfUers:this.state.numOfUers++ })

  }

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
          <NavBar
           ifUserLoggedIn={this.state.ifUserLoggedIn}
           userLoggedOut={this.userLoggedOut}
           openModalBtn={this.openModalBtn}
           usersLength={this.state.numOfUers}
             />
          <Route path="/Register/" exact render={() => <Register
            clickedRegister={this.clickedRegister}
             allinfo={this.state.box}
              />} />

          <Route path="/Chat/" exact render={() => <Chat  
           displayLength={this.displayLength}
           openModal={this.state.modal}
            toggle={() => this.toggle()} />} />

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