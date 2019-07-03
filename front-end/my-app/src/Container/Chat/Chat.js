
import React, { Component } from 'react'
import socketIOClient from 'socket.io-client';
import { MSG } from '../../Events'
import { Chat } from '@progress/kendo-react-conversational-ui';
import "./Chat.css"
import { Row } from 'reactstrap';
import ModalUsers from '../../Components/ModalUsers/ModalUsers';

 
 
class Chat1 extends Component {
  // endpoint   = 'http://localhost:8080';
    endpoint = window.location.origin;//socket
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      userName: localStorage.getItem("userdetails"),
      onlineUsers: [],
      socket:''

    };
    // this.name = props.name;  // for chat 
    const id = Math.random().toString().split('.')[1];
    this.user = { id: id, name: this.state.userName };
    this.addNewMessage = this.addNewMessage.bind(this);
    
    
  }


   
 componentDidMount =   ( ) => {
  this.socket = socketIOClient(this.endpoint);
  this.joinChat();

  this.socket.on("new message", data => {
      
     
    // console.log( this.state.messages)
    const arr = [...this.state.messages]  ;
    
    let Message = {
       author: data.author,
     timestamp: new Date(),
      text: data.text,
     };
     arr.push(Message)
     console.log( this.state.messages)
    this.setState({ messages: arr })
  });
}




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
    console.log(obj)
    obj.author = this.user
     
    this.socket
    .emit('send message',
    obj 
    );

 
  };

  // send message value to socket!
  sendMessageToSocket = (obj) => {
    console.log(obj)
 

}

// componentWillUnmount(){
//   this.socket.close();
// }
  render() {
    console.log(this.state.messages  )
    const {
      openModal,
      toggle,
      openModalBtn
    } = this.props;
    
    return (
      <div  >
        <div className="container-2">
          <div onClick={openModalBtn} className="btn btn-two">
            <span >Online Users</span>
          </div>
        </div>
        <Row>
          <ModalUsers openModal={openModal} onlineUsers={this.state.onlineUsers} toggle={toggle} />
          <Chat
            messages={this.state.messages}
            onMessageSend={this.addNewMessage}
            placeholder={"Type a message..."}
            width={600}>
          </Chat>
        </Row>
      </div>
    )
  }
}
export default Chat1;