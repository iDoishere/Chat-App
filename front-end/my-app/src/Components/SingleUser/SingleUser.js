 import React from 'react'
 import { ListGroupItem  } from 'reactstrap';

 function SingleUser({userName}) {
     return (
         <div>
              <ListGroupItem className="justify-content-between">{userName}  </ListGroupItem>
              
         </div>
     )
 }
 export default SingleUser