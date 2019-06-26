 


  import React, { Component } from 'react'
import Input from '../../Components/Input/Input'
import Login from '../../Container/Login/Login'
import { PostDataToMongo, getDataFromMongo } from './PostData'
import Chat from '../Chat/Chat'
import { BrowserRouter as Router, Route, Redirect,Switch,Link  } from "react-router-dom";
import Register from '../Register/Register'
import NavBar from '../../Components/NavBar/NavBar'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
 
class MainApp extends Component {


  serverUrl = "http://localhost:3000";
  constructor(props) {
    super(props)
    this.state = {
      ifUserLoggedIn:false,
      name:null 
    };
  }
  setDatainLocalStorage(name) {
        
    console.log(name)
    localStorage.setItem('userdetails', name);


} 
  loginUser = async (user) => {
     const url = this.serverUrl + "/users/login";
     const auth = `Basic ${ btoa(`${user.name}:${user.password}`)}`;
     fetch(url, {
       method: 'POST',
       headers: new Headers({
           Authorization: auth
       })
   }).then(res => res.json())
       .then(res => {
           if (res.autorized) {
            this.setDatainLocalStorage(user.name);
             this.setState({ifUserLoggedIn: !this.state.ifUserLoggedIn,name:user.name})
           }
       })
       .catch(err => console.log('No Authrization')); 
    }
    clickedRegister = async (obj) => {
      const url = this.serverUrl + "/users/register";
      let sendRegister = await PostDataToMongo(obj,url)
   
    }
    userLoggedOut = ()=>{
      this.setState({ifUserLoggedIn:false});
    }
    render() {
      return (
        <div>
    <Router>
          <NavBar ifUserLoggedIn={this.state.ifUserLoggedIn} userLoggedOut={this.userLoggedOut} />   
          <Route path="/Register/" exact render={() => <Register 
            clickedRegister={this.clickedRegister}/>}/>  
          <Route path="/Chat/" exact render={() => <Chat name={this.state.name}/>}/>      
          <Route path="/" exact render={() => (
            this.state.ifUserLoggedIn ? (<Redirect to='/Chat/' />) :
              (<Login loginUser={this.loginUser}   />)
          )} />       
          </Router>
        </div>
      )
    }
  }
  export default MainApp;