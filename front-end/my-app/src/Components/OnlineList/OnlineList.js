import React from 'react'
import SingleUser from '../SingleUser/SingleUser'
import { ListGroup } from 'reactstrap';

 function OnlineList({onlineUsers}) {
     console.log(onlineUsers)
    return (
        <div>    
    <ListGroup>
       {
           onlineUsers ?onlineUsers.map((user,index ) =>{
               return (
                   <SingleUser
                   userName = {user}
                   key={index}
                   />
               )
           }):''
       }
           </ListGroup>
        </div>
    )
}
export default OnlineList