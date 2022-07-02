import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Home(){

  const [transactions, setTransactions] = useState();
  // other transactions for search
  const [transModify, setTransModify] = useState();
  const [value, setValue] = useState("");

  const url = "http://63.135.170.173:5000/transactions";
 
// ALERT
const notify = (val) => toast.warn(val, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });



 let myHeaders = new Headers({
Authorization: 'a9d2b671-5550-44ee-a53a-49ea04380def'
  });
  
  let myInit = {
     method: 'get',
    headers: myHeaders
  };

  let myRequest = new Request(url, myInit);


// GET TRANSACTIONS

  const fetchApiTransactions = async () => {
    try{
      const response = await fetch(myRequest);
      if(response.ok){
        const responseJSON = await response.json();
        const dataTransactions = responseJSON.data;
       // console.log(response.status);
        console.log("Api conected HOME!")
       // console.log(dataTransactions);
       setExistT(true);
        setTransactions(dataTransactions);
        setTransModify(dataTransactions);
      }
   
    }
    catch(err){
      console.log(err)
    }
   
  }



useEffect(() => {

fetchApiTransactions();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


// DELETE TRANSACTION

const deleteTransaction = async (id) => {
  myInit.method = "delete";
  let myRequestDelete = new Request(url+"/"+id, myInit);

  const response = await fetch(myRequestDelete);
  const responseJSON = await response.json();
  if(responseJSON.success)
  {
    console.log("DELETE COMPLETED!");
    //console.log(responseJSON); 
    await fetchApiTransactions();
  }
  else{
    console.log("ERROR!");
    console.log(responseJSON);
    console.log(id)
  }


}

// FIND TRANSACTIONS

// Exist Transactions?
const [existT, setExistT]= useState(false);

const findTransaction = () => {
  let name = value;

  const result = transModify.filter(x => x.concept.toLowerCase().includes(name.toLocaleLowerCase()) );

  setTransactions(result);
  //console.log(result);
  if(result.length === 0){
    setExistT(false);
  }
  else{
    setExistT(true);
  }



}

const InputChanged = (e) => {

const valueInput = e.target.value;

// Validation Search Wrong
  let regex = new RegExp("^[ñíóáéú a-zA-Z 0-9 ]+$");
    for(let i = 0; i <= valueInput.length -1; i++){
        let letra = valueInput[i]
        if(!regex.test(letra ) || !letra === " "){
          notify("NO SE PERMITEN CARACTERES ESPECIALES! CARACTER INSERTADO: "+letra);      
          return;
                
        }
    }
  setValue(valueInput);

}

// ORDER A-Z Z-A
const [order, setOrder] = useState(false);

const doOrder = () => {

  if(!order)
  {
    const result = transactions.sort(
      (a,b) => a.concept.localeCompare(b.concept)
    );
   // console.log(result)
    setTransactions(result)
    setOrder(true);
  }
  else{
    const result = transactions.reverse(
      (a,b) => a.concept.localeCompare(b.concept)
    );
  //  console.log(result)
    setTransactions(result)
    setOrder(false);
  }



}





return(
<>
<div className="form-group row">
  <div className="">
  <input className="form-control mt-3 " value={value} name="search" onChange={InputChanged} />
 
  </div>
  <div className="">

  <button className="btn btn-info col-12" onClick={findTransaction} >Buscar</button>
  </div>
  <div>
    <button className="btn btn-secondary" onClick={doOrder}>{!order ? "ORDENAR A-Z" : "ORDENAR Z-A"}</button>
  </div>

</div>

{!existT ? <label className="alert alert-danger mt-5"> NO SE ENCONTRARON TRANSACCIONES!</label> : 


<div className="row ">
{
    !transactions ? "CARGANDO... " : transactions.map((x) => (
      <div className="card text-center m-3" style={{"width": "18rem"}}  key={x.id}>

 <div className="card-body">
  <h5 className="card-title">{x.concept}</h5>
  <Link className="card-text" to={`/description/${x.id}`}>Más Información</Link>
  <button className="btn btn-danger col-12" onClick={() => deleteTransaction(x.id)}>Eliminar</button>
 </div>
 
 
      </div>
     

    ))
  }
</div>


}
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
</>
)


}

export default Home;