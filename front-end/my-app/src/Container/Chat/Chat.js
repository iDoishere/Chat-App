
import React, { Component } from 'react'
import ShowText from '../../Components/ShowText/ShowText'
import Input from '../../Components/Input/Input'
import socketIOClient from 'socket.io-client';
import { MSG } from '../../Events'
import { Chat } from '@progress/kendo-react-conversational-ui';
import "./Chat.css"
import { Container, Row, Col } from 'reactstrap';

let i =0;
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
  

   socket     
   .emit('setToSocketOnLiNE', {user: this.state.userName})

  //  socket.on("allmsg", data => {
  //   this.setState({datafromMongo:data})
 
  // }  );
  //  const CurrentMsg = await getDataFromMongo(this.serverUrl + "/messages");
  //  this.setState({ datafromMongo: CurrentMsg })
  }

  // when user join to chat

  initSocket = async (props) => { 
 
    const socket = socketIOClient(endpoint);
    this.setState({ socket: socket  })

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


    socket
    .on('onlineConnect', onlineUsersFromSoCKET => {
        this.setState({onlineUsers: onlineUsersFromSoCKET});
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
   
    const mapped = this.state.onlineUsers.map((user,index) => {
      console.log(this.state.onlineUsers)
       return (
         <div>    
         <li className="nameList"  key={index}>
           <h4>{user.username}</h4>  
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
        {/* <ShowText   allMassges={this.state.messages} />   */}
        {/* <Input clicked={ this.sendMessage}    
        /> */}       
        </div>
      {/* <ShowText  messages = {this.state.messages}/> */}
      </div>
    )
  }
}
export default Chat1;