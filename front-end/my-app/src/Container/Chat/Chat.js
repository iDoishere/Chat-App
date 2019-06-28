
import React, { Component } from 'react'
import socketIOClient from 'socket.io-client';
import { MSG } from '../../Events'
import { Chat } from '@progress/kendo-react-conversational-ui';
import "./Chat.css"
import {   Row, Col } from 'reactstrap';
 
const endpoint = 'http://localhost:3001';
class Chat1 extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
       text:'',
        messages: [],    
        userName: localStorage.getItem("userdetails"),
        onlineUsers:[]

    };
    this.name = props.name;  // for chat 
     const id = Math.random().toString().split('.')[1];
     this.user = {  id: id, name:this.name};
}

  componentDidMount = async(props) => {
   this.initSocket(props);
   const socket = socketIOClient(endpoint);
  

   //push user to array connected users.
   socket     
   .emit('setToSocketOnLiNE', {user: this.state.userName})

   //send to the socket a req then respone will be all users
   socket     
   .emit('getallusers')


// get all users from socket and display them
   .on('sendallusers', onlineUsersFromSoCKET => {
    this.setState({onlineUsers: onlineUsersFromSoCKET});
   });

}
 

  //init socket and save it to setstate!
  initSocket = async (props) => { 
 
    const socket = socketIOClient(endpoint);
    this.setState({ socket: socket  })
// listen to socket message coming from back-end!
    socket.on("output", data => {   
          const arr = [...this.state.messages];
          
      let Message =  {
            author:  data.author,
            timestamp: new Date(),
            text: data.text,      
        };
          arr.push(Message)
          this.setState({messages:arr})
    });
    socket
    .on('onlineConnect', onlineUsersFromSoCKET => {
        this.setState({onlineUsers: onlineUsersFromSoCKET});
    });

   // if user log out the user will be remove from list in node.
    socket
    .on('filter', filter => {
      console.log(filter )
        this.setState({onlineUsers: filter});
    });
  }
//user pressed on send message!
  addNewMessage = (event) => {
        
    let botResponce = Object.assign({}, event.message);
    botResponce.author = this.user
    this.sendMessageToSocket(botResponce)
};

  // send message value to socket!
sendMessageToSocket = (text) => {

    this.state.socket
      .emit(MSG, 
        text         
      );
  }

  render() {
   
    const mapped = this.state.onlineUsers.map((user,index) => {
      console.log(this.state.onlineUsers)
       return (
         <div>    
         <li className="nameList"  key={index}>
           <h4>{user}</h4>  
         </li>
         </div>
   
       )
    })
    const {
      name
    } = this.props;
 
    return (
      <div>
      
        <div>
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }}>
          <div>
            <h3>Online Users:</h3>
           </div>
           <div  >
             <ul  >
             {mapped} 
             </ul>
           </div>        
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }}>        
          <Chat  
                messages={this.state.messages}      
                onMessageSend={this.addNewMessage}
                placeholder={"Type a message..."}
                width={600}>                
                </Chat>
          </Col>
        </Row>    
        </div>   
      </div>
    )
  }
}
export default Chat1;