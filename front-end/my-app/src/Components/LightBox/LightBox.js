import React from "react";
import './LightBox.css'
 
const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};

const LightBox = ({allinfo}) => {

  const bannerClass = allinfo.color === '0' ? "warning" : "success"; 
 console.log(allinfo)
 
    return(
        
    <div className={bannerClass +" banner"}>
    <h3> { allinfo.msgToUser}</h3>
    </div>
      
    );
}
  



 

export default  LightBox ;
