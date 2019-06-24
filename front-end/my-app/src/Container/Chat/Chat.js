
import React, { Component } from 'react'

import ShowText from '../../Components/ShowText/ShowText'
import Input from '../../Components/Input/Input'

import openSocket from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import { MSG } from '../../Events'
import { PostDataToMongo, getDataFromMongo } from '../../Container/MainApp/PostData'
// var socket = io.connect('http://localhost:3000')






const endpoint = 'http://localhost:3001';
class Chat extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      socket: null,
      response: [],
      datafromMongo:[]
    };
    this.handleChange = this.handleChange.bind(this);

  }
  componentDidMount = async() => {
   this.initSocket();
   const socket = socketIOClient(endpoint);

  //  socket.on("allmsg", data => {
  //   this.setState({datafromMongo:data})
 
  // }  );
  //  const CurrentMsg = await getDataFromMongo(this.serverUrl + "/messages");
  //  this.setState({ datafromMongo: CurrentMsg })
  }

  initSocket = async () => { 
    const socket = socketIOClient(endpoint);
    this.setState({ socket: socket })
    
    socket.on("output", data => {
      console.log(data)
      const arr = [...this.state.datafromMongo]
      arr.push(data);
      this.setState({datafromMongo:arr})
    }  );

  }
  sendMessage = () => {
    const data = this.state.text;
    this.state.socket
      .emit(MSG, 
          this.state.text
              
      );
  }
 
  handleChange(event) {
    const text = { text: event.target.value }
    this.setState({ text: text });
  }


  render() {
    const {
      name
    } = this.props;
    return (
      <div>
      <h1>{name}</h1>
        <ShowText   allMassges={this.state.datafromMongo} />  
        <Input clicked={ this.sendMessage}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}
export default Chat;