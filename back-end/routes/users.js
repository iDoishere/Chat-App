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
  
  if(currentObj.name === '' ||currentObj.pass === '' ||currentObj.rePass === '' ){
    res.send({info:'misssing inputs'}) 
    return;
  }
 
  if(currentObj.pass.length < 8  || currentObj.rePass.length < 8){
    res.send({"auth":false,info:'Password must be 8 digits'}) 
    return;
  }

  if(currentObj.pass !== currentObj.rePass){
    res.send({"auth":false,info:'Password doesnt match'}) 
    return;
  }


 if(!checkUserExits(currentUsers,currentObj)){
   res.send({"auth":false,info:'user exits'}) 
   return;
 }
 else{
   currentObj.pass = md5(currentObj.pass);
   currentObj.rePass = md5(currentObj.rePass);
   const result = await myService.insertOne(currentObj, 'users')
   res.send({"auth":true,info:'Youre In'}) 
   return;
 }
});
function checkUserExits(currentUsers,currentObj){
  let ifTrue=false;
 for (let user of currentUsers) { 
 if(user.name != currentObj.name){
   ifTrue = true;
  }  else{
  return false;
  }
 }
 return ifTrue;
}
 
module.exports = router;
