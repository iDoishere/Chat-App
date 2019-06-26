// import React from 'react'

// function SingleText({msg}) {
//     return (
//         <div>
//            <p>{msg}</p>
//         </div>
//     )
// }
// export default SingleText;
import React, { Component } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'

export default class Try extends Component {
   state = {
        messages: [
          new Message({
            id: 1,
            message: "I'm the recipient! (The person you're talking to)",
          }), // Gray bubble
  
        ],
        //...
      };
    render() {
        const {
            allMassges,
            msg
        } = this.props;
        return (
            <div>
                <ChatFeed
      messages={msg} // Boolean: list of message objects
      isTyping={this.state.is_typing} // Boolean: is the recipient typing
      hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      // JSON: Custom bubble styles
      bubbleStyles={
        {
          text: {
            fontSize: 10
          },
          chatbubble: {
            borderRadius: 70,
            padding: 10
          }
        }
      }
    />
    
            </div>
        )
    }
}
