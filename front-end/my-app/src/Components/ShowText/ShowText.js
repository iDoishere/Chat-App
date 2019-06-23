import React from 'react'
import SingleText from '../SingleText/SingleText'
import './ShowText.css'
function ShowText({allMassges,getData1sec}) {
     
 console.log(allMassges)
    return (
        <div className="ShowText">
          {
              allMassges.map((msg,index)=>{
                 
                  return (
                    <SingleText  msg={msg.text}  />
                  )
               
              })
          }
        </div>
    )
}


export default  ShowText;