import React from "react";
import './LightBox.css'
 

const LightBox = ({allinfo}) => {

  const bannerClass = allinfo.color === '0' ? "warning" : "success"; 

    return(
    <div>
      {  allinfo.show ?    
      <div  className={bannerClass +" banner"}>
           <h4>{allinfo.msgToUser}</h4>
        </div>
      : null
             
      }
    </div>   
    )
}
export default  LightBox ;
