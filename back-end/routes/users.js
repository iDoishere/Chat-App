var express = require('express');
var router = express.Router();
const dbService = require('../dbServies')
const basicAuth = require('express-basic-auth');
var md5 = require('md5');
let currentUsers=null;

router.use(async(req,res,next)=> {
  myService = new dbService();
    await myService.initDB()
    currentUsers =  await myService.getAll('users')  
  next()
})

function  authorizer (name, password) { 
  return  currentUsers.some(user => user.name === name && user.pass === md5(password))   
}

router.post('/login',  basicAuth({ authorizer}) , function (req, res, next) { 
  res.send({ autorized:true});
});

router.post('/register',async function(req, res, next) {   
  const currentObj = req.body;
  const currentUsers =  await myService.getAll('users')
 
  if(!checkMissingText(currentObj)){
    res.send({"auth":false,info:'missing text or pass incorrect'}) 
    return;   // to avoid res handle eroor
 }
//  if(!validateEmail(currentObj.email)){
//    res.send({"auth":false ,info:'Check your email'}) 
//    return;
//  }  
 if(checkUserExits(currentUsers,currentObj)){
   res.send({"auth":false,info:'user exits'}) 
   return;
 }
 else{
   currentObj.pass = md5(currentObj.pass);
   currentObj.rePass = md5(currentObj.rePass);
   const result = await myService.insertOne(currentObj, 'users')
   res.send({"auth":true}) 
   return;
 }
});
function checkUserExits(currentUsers,currentObj){
  let ifTrue=false;
 for (let user of currentUsers) { 
 if(user.name != currentObj.name){
   ifTrue = false;
  }  else{
   ifTrue = true;
  }
 }
 return ifTrue;
}
function checkMissingText(currentObj){
 if(currentObj.name === '' ||currentObj.pass === '' ||currentObj.rePass === '' ){
   return false;
}
if(currentObj.pass.length < 8  || currentObj.rePass.length < 8){
 return false;
}
if(currentObj.pass !== currentObj.rePass){
 return false;
}
return true;
}
function validateEmail(email) {
  
 var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return answer= re.test(String(email).toLowerCase()); 
  
}
module.exports = router;
