
import React, { Component } from 'react'
import socketIOClient from 'socket.io-client';
import { MSG } from '../../Events'
import { Chat } from '@progress/kendo-react-conversational-ui';
import "./Chat.css"
import ModalUsers from '../../Components/ModalUsers/ModalUsers';

class Chat1 extends Component {
    // endpoint   = 'http://localhost:8080';
     endpoint = window.location.origin;  // heroku path
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      userName: localStorage.getItem("userdetails"),
      onlineUsers: [],
     
     
    };
    // this.name = props.name;  // for chat 
    const id = Math.random().toString().split('.')[1];
    this.user = { id: id, name: this.state.userName };
    this.addNewMessage = this.addNewMessage.bind(this);  
  }

 componentDidMount =   ( ) => {
  this.socket = socketIOClient(this.endpoint);
   this.joinChat();

   //msg recived from socket and display to user.
  this.socket.on("new message", data => { 
    const arr = [...this.state.messages]  ; 
    let Message = {
       author: data.author,
     timestamp: new Date(),
      text: data.text,
     };
     arr.push(Message)  
     this.setState({ messages: arr })
  });
}

   // user join the chat socket send
 joinChat(){
  this.socket
    .emit('new user',   this.state.userName )

    this.socket
    .on('get users', data => {  
      this.setState({ onlineUsers: data  });
    });
}
  //user pressed on send message!
  addNewMessage = (event) => {
    let obj = Object.assign({}, event.message);
    obj.author = this.user   
    this.socket
    .emit('send message',
    obj 
    );
  };

//close connnection when page die
componentWillUnmount(){
  this.socket.close();
}

  render() {
 
    const {
      openModal,
      toggle,
    } = this.props;
   
    return (
      <div  >
          <ModalUsers openModal={openModal} onlineUsers={ this.state.onlineUsers} toggle={toggle} />   
         
         <div className="a">
          <div className="h4">
          <h4>{ 'Hello ' + this.state.userName}</h4>
            </div> 
        
          <div className="chat">
          <Chat
            messages={this.state.messages}
            onMessageSend={this.addNewMessage}
            placeholder={"Type a message..."} 
            >
          </Chat>
          </div>   
          </div> 
      </div>
    )
  }
}
export default Chat1;