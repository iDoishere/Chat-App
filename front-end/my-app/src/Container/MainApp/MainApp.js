
import React, { Component } from 'react'
import Input from '../../Components/Input/Input'
import Login from '../../Container/Login/Login'
import { PostDataToMongo, getDataFromMongo } from './PostData'
import Chat from '../Chat/Chat'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import Register from '../Register/Register'
import NavBar from '../../Components/NavBar/NavBar'
import LightBox from '../../Components/LightBox/LightBox';
import socketIOClient from 'socket.io-client';

class MainApp extends Component {

  endpoint = 'http://localhost:3001';//socket
  serverUrl = "http://localhost:3000";
  constructor(props) {
    super(props)
    this.state = {
      ifUserLoggedIn: localStorage.getItem("ifOnline"),
      name: null,
      msgToUser: '',
      isDisplayed: false,
      banner: {
        isDisplayed: false, msgToUser: "", color: ''
      }

    };
  }

  

  setDatainLocalStorage(name) {
    let ifOnline=true;


    localStorage.setItem('userdetails', name);
    localStorage.setItem('ifOnline', ifOnline);
  }



  //login user
  loginUser = async (user) => {
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
          this.setDatainLocalStorage(user.name);
          this.setState({ ifUserLoggedIn: !this.state.ifUserLoggedIn, name: user.name })
        }
      })
      .catch(err => {
        this.displayLightBox('Sign in first', '0');
      });
  }
//display modal to user about arror etc...
  displayLightBox = (msgToUser, color) => {
    const banner = { isDisplayed: true, msgToUser, color };
    this.setState({ banner });
    this.bannerTimeOut = setTimeout(() => {
      const banner = { isDisplayed: false, msgToUser: "", color: null };
      this.setState({ banner })
    }, 3000);
  }

  clickedRegister = async (obj) => {
    console.log(obj)

    const url = this.serverUrl + "/users/register";
    let resultRegsiter = await PostDataToMongo(obj, url)

    if (resultRegsiter.info === 'misssing inputs') {
      this.displayLightBox(resultRegsiter.info, '0')
    }
    if (resultRegsiter.info === 'Password must be 8 digits') {
      this.displayLightBox(resultRegsiter.info, '0')
    }
    if (resultRegsiter.info === 'Password doesnt match') {
      this.displayLightBox(resultRegsiter.info, '0')
    }

    if (resultRegsiter.info === 'user exits') {
      this.displayLightBox(resultRegsiter.info, '0')
    }
    if (resultRegsiter.info === 'Youre In') {
      this.displayLightBox(resultRegsiter.info, '1')
    }
  }

//user logs out
  userLoggedOut = () => {
    const socket = socketIOClient(this.endpoint);
  
   console.log('userLoggedOut function -1 ')
    socket     
    .emit('logout', {user: this.state.name})
    localStorage.clear();
      this.setState({ ifUserLoggedIn: false });
  }


  render() {
   
    return (
      <div>
        <Router>
          <NavBar ifUserLoggedIn={this.state.ifUserLoggedIn} userLoggedOut={this.userLoggedOut} />
          <Route path="/Register/" exact render={() => <Register
            clickedRegister={this.clickedRegister} />} />
          <Route path="/Chat/" exact render={() => <Chat name={this.state.name} />} />
          <Route path="/" exact render={() => (
            this.state.ifUserLoggedIn ? (<Redirect to='/Chat/' />) :
              (<Login loginUser={this.loginUser} />)
          )} />

          {
            this.state.banner.isDisplayed ? <LightBox allinfo={this.state.banner} /> : ''
          }

        </Router>
      </div>
    )
  }
}
export default MainApp;