
import React, { Component } from 'react'
import ShowText from '../../Components/ShowText/ShowText'
import Input from '../../Components/Input/Input'
import socketIOClient from 'socket.io-client';
import { MSG } from '../../Events'
import { Chat } from '@progress/kendo-react-conversational-ui';

import { ChatFeed, Message } from 'react-chat-ui'
let i =0;
const endpoint = 'http://localhost:3001';
class Chat1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
       text:'',
        messages: [],    
    };
    this.name = props.name;
     const id = Math.random().toString().split('.')[1];
     this.user = {  id: id, name:this.name};
}

  componentDidMount = async(props) => {
   this.initSocket(props);
   const socket = socketIOClient(endpoint);
  //  socket.on("allmsg", data => {
  //   this.setState({datafromMongo:data})
 
  // }  );
  //  const CurrentMsg = await getDataFromMongo(this.serverUrl + "/messages");
  //  this.setState({ datafromMongo: CurrentMsg })
  }

  initSocket = async (props) => { 
 
    const socket = socketIOClient(endpoint);
    this.setState({ socket: socket  })
    let i = 0;
    socket.on("output", data => {   // listen to socket message
      console.log(data)
          const arr = [...this.state.messages];
          
      let Message=    {
            author:  data.author,
            timestamp: new Date(),
            text: data.text,      
        };
          arr.push(Message)
          this.setState({messages:arr})
    });
  }

  addNewMessage = (event) => {
        
    let botResponce = Object.assign({}, event.message);
    botResponce.author = this.user
     this.sendMessageToSocket(botResponce)
};

  
sendMessageToSocket = (text) => {

    this.state.socket
      .emit(MSG, 
        text         
      );
  }

  render() {

    const {
      name
    } = this.props;

    return (
      <div>
      <h1>{name}</h1>
        {/* <ShowText   allMassges={this.state.messages} />   */}
        {/* <Input clicked={ this.sendMessage}
         
        /> */}
 
   
               <Chat  
                
                    messages={this.state.messages}
                    
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type a message..."}
                    width={1000}>
                      
                </Chat>

      {/* <ShowText  messages = {this.state.messages}/> */}
      </div>
    )
  }
}
export default Chat1;