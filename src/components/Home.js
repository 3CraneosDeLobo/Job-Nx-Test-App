import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';



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
const [idTransaction, setIdTransaction] = useState("");
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = (id) => {
  setIdTransaction(id);
  //console.log(id);
  setShow(true)
};

const deleteTransaction = async () => {
  handleClose();
  let id = idTransaction;
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
<div>
<div className="form-group row">
  <div >
  <input className="form-control mt-3 " value={value} name="search" onChange={InputChanged} />
 
  </div>
  <div >

  <button className="btn btn-info col-12" onClick={findTransaction} >Buscar</button>
  </div>
  <div>
    <button className="btn btn-secondary" onClick={doOrder}>{!order ? "ORDENAR A-Z" : "ORDENAR Z-A"}</button>
  </div>

</div>

{!existT ? <label 
className="alert alert-danger mt-3 d-block text-center" 
role="alert"> NO SE ENCONTRARON TRANSACCIONES!</label> : 


<div className="row ">
{
    !transactions ? "CARGANDO... " : transactions.map((x) => (
     
     

 
      <div className="card text-center m-3 mx-auto" style={{"width": "18rem"}}  key={x.id}>

<div className="card-body">
 <h5 className="card-title">{x.concept}</h5>
 <Link className="card-text" to={`/description/${x.id}`}>Más Información</Link>
 {
       x.candidateId === "a9d2b671-5550-44ee-a53a-49ea04380def"
       ?
       <button className="btn btn-danger col-12" onClick={() => handleShow(x.id)}>Eliminar</button>
       : 
       <button className="btn btn-secondary col-12" disabled>Eliminar</button>
       
       
       }
 

</div>


     </div>
    

    ))
  }
</div>


}
</div>
{/* Alert Search */}
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

<div>
{/* Modal Delete  */}
<Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title><strong>ELIMINAR TRANSACCION</strong></Modal.Title>
         </Modal.Header>
   
       
         <Modal.Body>
<h3>Estas seguro que quieres eliminar esta transaccion?</h3>

</Modal.Body>
<Modal.Footer>
<button className="btn btn-danger col-5 mx-auto" onClick={() => handleClose()} >NO</button>
           <button className="btn btn-success col-5 mx-auto" onClick={() => deleteTransaction()} >SI</button>
</Modal.Footer>

         
       
       </Modal>
</div>







</>



)


}

export default Home;