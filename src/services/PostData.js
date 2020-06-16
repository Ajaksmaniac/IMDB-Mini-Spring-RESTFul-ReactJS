
export function PostData(type, userData){

    let BaseUrl = 'http://localhost:8082/users';

   return new Promise((resolve,reject)=>{
        fetch(BaseUrl+type,{
            method:'POST',
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        });
    });
   
    
}

export function CommentsData(type, userData){

    let BaseUrl = 'http://localhost:8082/comments';

   return new Promise((resolve,reject)=>{
        fetch(BaseUrl+type,{
            method:'GET',
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        });
    });
   
    
}