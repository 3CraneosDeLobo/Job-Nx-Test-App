

// >>>>>>>>>>>>>>> TRANSACTIONS FETCH <<<<<<<<<<<<<<<<<<<

//--------- GET TRANSACTIONS REQUEST --------------
export const GetTransactions = async () => {
    const url = "http://63.135.170.173:5000/transactions";
    let myHeaders = new Headers({
      Authorization: 'a9d2b671-5550-44ee-a53a-49ea04380def'
        });
        
        let myInit = {
           method: 'get',
          headers: myHeaders
        };
      
        let myRequest = new Request(url, myInit);
        let dataTransactions = "";
    try{
      const response = await fetch(myRequest);
      const responseJSON = await response.json();
      if(responseJSON.success){
        dataTransactions = responseJSON.data;
        console.log("GET TRANSACTIONS SUCCESS TRUE!")
        const success = true;
        return {success, dataTransactions};
      }
      else{
        console.log("GET TRANSACTIONS SUCCESS FALSE!");
        const success = false;
        return {success, dataTransactions};
      }
   
    }
    catch(err){
      console.log(err)
    }
   
  }

//---------- GET TRANSACTION REQUEST --------------

export const GetTransaction = async (id) => {
     
    const url = "http://63.135.170.173:5000/transactions";
 let myHeaders = new Headers({
Authorization: 'a9d2b671-5550-44ee-a53a-49ea04380def'
  });
  let myInit = {
     method: 'get',
    headers: myHeaders
  };
  let myRequest = new Request(url, myInit);

    try{
      const response = await fetch(myRequest);
      const responseJSON = await response.json();
      let dataTransaction = "";
      if(responseJSON.success){
        
        const dataTransactions = responseJSON.data;
         dataTransaction = dataTransactions.find(x => x.id === id);
      //  console.log(response.status);
        
     //   console.log(dataTransaction);
     console.log("GET TRANSACTION SUCCESS TRUE!")
     const success = true;
     return {success, dataTransaction};
      }
      else{
        console.log("GET TRANSACTION SUCCESS FALSE!")
        const success = false;
        return {success, dataTransaction};
      }
   
    }
    catch(err){
      console.log(err)
    }
   
  }

//-------- POST TRANSACTION REQUEST ---------------

export const PostTransaction = async (bodyForm) => {
    let myHeaders = new Headers({
        'Authorization': 'a9d2b671-5550-44ee-a53a-49ea04380def',
        'Content-Type': 'application/json'
          });
    let myInit = {
        method: 'post',
       headers: myHeaders,
       body: JSON.stringify(bodyForm)
     };
    const url = "http://63.135.170.173:5000/transactions";
    let myRequest = new Request(url, myInit);

  try{
    const response = await fetch(myRequest);
    const responseJSON = await response.json();
    if(responseJSON.success){
        console.log("POST REQUEST SUCCESS!");
        
    }
    else {
        console.log("ERROR POST TRANSACTION REQUEST");
        console.log( responseJSON);
      
    }
  }
  catch(err){
    console.log(err);
  }



}

//--------- PUT TRANSACTION REQUEST ---------------
export const PutTransaction = async (transaction) => {

    // ------ BodyForm/ Data Transaction Form PUT
    let bodyForm = {
        'id': transaction.id,
        'concept': transaction.concept,
        'description': transaction.description,
        'ammount': parseFloat(transaction.ammount),
        'date': transaction.date
     }

// -------- Request PUT Configuration
    let myHeaders = new Headers({
        'Authorization': 'a9d2b671-5550-44ee-a53a-49ea04380def',
        'Content-Type': 'application/json'
          });
    let myInit = {
         method: 'put',
        headers: myHeaders,
        body: JSON.stringify(bodyForm)
         };
    const url = "http://63.135.170.173:5000/transactions";
        let myRequest = new Request(url, myInit);


// ------ Fetch API PUT
try{
    const response = await fetch(myRequest);
    const responseJSON = await response.json();
    
    
    if(responseJSON.success){
        console.log("PUT CORRECT!");
       // console.log(responseJSON);
        
    }
    else{
        console.log("ERROR PUT");
        //console.log(responseJSON);
    }
}
catch(err){
    console.log(err);
}

}

//--------- DELETE TRANSACTION REQUEST -------------

export const DeleteTransaction = async (id) => {
    const url = "http://63.135.170.173:5000/transactions";  
    let myHeaders = new Headers({
      Authorization: 'a9d2b671-5550-44ee-a53a-49ea04380def'
        });
        
        let myInit = {
           method: 'get',
          headers: myHeaders
        };
    
    myInit.method = "delete";
    let myRequestDelete = new Request(url+"/"+id, myInit);
  
    const response = await fetch(myRequestDelete);
    const responseJSON = await response.json();
    if(responseJSON.success)
    {
      console.log("DELETE COMPLETED!");
      return true;
    }
    else{
      console.log("ERROR DELETE REQUEST!");
      console.log(responseJSON);
      console.log(id)
      return false;
    }
  
  
  }

// >>>>>>>>>>>>>>>>> ACCOUNTS FETCH <<<<<<<<<<<<<<<<<<<<<

//--------- GET ACCOUNTS REQUEST -------------------

export const GetAccounts = async () =>{
    let myHeaders = new Headers({
        'Authorization': 'a9d2b671-5550-44ee-a53a-49ea04380def',
        'Content-Type': 'application/json'
          });
    let myInit = {
        method: 'get',
       headers: myHeaders
     };
    const urlAccount = "http://63.135.170.173:5000/accounts";
    let myRequest = new Request(urlAccount, myInit);


    try{
        const response = await fetch(myRequest);
        const responseJSON = await response.json();
        let dataAccount = "";
        if(responseJSON.success){
            console.log("GET ACCOUNT REQUEST SUCCESS!")
            dataAccount = responseJSON.data;
            const success = true;
            return {success, dataAccount}
        }
        else{
            console.log("ERROR: GET ACCOUNT REQUEST FAILED!");
            const success = true;
            return {success, dataAccount}
        }
    }
    catch(err){
        console.log(err)
    }
}
