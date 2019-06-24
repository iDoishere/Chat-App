 


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
      name:''
      
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  loginUser = async (user) => {
   console.log(user)
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
  //   componentDidMount = async () => {
  //   const CurrentMsg = await getDataFromMongo(this.serverUrl + "/messages");
  //   this.setState({ datafromMongo: CurrentMsg })
  // }
    // handleChange(event) {
    //   this.setState({ text: event.target.value });
    // }

    // clicked = async () => {
    //   const data = this.state.text;
    //   let mainInfo = { data }
    //   const url = this.serverUrl + "/messages";
    //   const CurrentServers = await PostDataToMongo(mainInfo, url);

      
    // }

    // loginUser = async (user) => {
    //   const url = this.serverUrl + "/users";
    //   const CurrentServers = await PostDataToMongo(user, url);
    // }
   

 

    render() {
     
     
      return (
        <div>
    <Router>
      <NavBar ifUserLoggedIn={this.state.ifUserLoggedIn} userLoggedOut={this.userLoggedOut} />
           
           {/* <Route exact path='/Register/' render={() => {
              return (           
                      <div>
                        <Register   clickedRegister={clickedRegister}/>
                      </div>
                        )}}/>     */}
                            <Route path="/Register/" exact render={(props) => <Register 
                             clickedRegister={this.clickedRegister} 
                             />}
                              />   
          
 
          <Route path="/Chat/" exact render={(props) => <Chat name={this.state.name}
          
          
          />} />   
            
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