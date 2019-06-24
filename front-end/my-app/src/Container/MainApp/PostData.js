

export async function PostDataToMongo(mainInfo,url){
 
return   fetch(url , {
  method: 'POST', 
  body: JSON.stringify(mainInfo),  
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(response => response)
  
}

 

export async function getDataFromMongo(user,url){
 

  const auth = `Basic ${ btoa(`${user.email}:${user.password}`)}`;

  fetch(url, {
    method: 'POST',
    headers: new Headers({
        Authorization: auth
    })
}).then(res => res.json())
    .then(res => {
        if (res.autorized) {
      return   res
        }
    })
    .catch(err => console.log('No Authrization'));

}
 