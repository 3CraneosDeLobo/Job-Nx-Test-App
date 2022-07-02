import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function CreateTransaction({
    edit,
    editID, 
    editConcept,
    editAmmount,
    editDate,
    editDescription,
    editAccount
}){

    // Inputs Ref
    const iConcept = useRef(null);



// Alert Configuration

const notify = (value) => toast.error(value, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });;


//------- Accounts State
    const [accounts, setAccounts] = useState();

//------- Transaction STATE
     const [transaction, setTransaction] = useState({ 
        hasChanged: false,
        concept: "",
        description: "",
        ammount: "0",
        date: "",
        account: ""
    
    });

// ------ SET EDIT DATA

const setEditData = () => {
    if(edit)
    {
        try{
            setTransaction({...transaction,
                hasChanged: true,
                concept: editConcept,
                description: editDescription,
                ammount: editAmmount,
                date: moment(editDate).format('yyyy-MM-DDThh:mm'),
                account: editAccount
                
                
               
               } );
        }
        catch(err){
            console.log(err)
        }
       
    }
}



// Request Info 
    let myHeaders = new Headers({
        'Authorization': 'a9d2b671-5550-44ee-a53a-49ea04380def',
        'Content-Type': 'application/json'
          });
          
    // Getting Accounts by the API

    const GetAccounts = async () =>{
      
        let myInit = {
            method: 'get',
           headers: myHeaders
         };
        const urlAccount = "http://63.135.170.173:5000/accounts";
        let myRequest = new Request(urlAccount, myInit);


        try{
            const response = await fetch(myRequest);
            if(response.ok){
                console.log("Accounts Ready!")
                const responseJSON = await response.json();
                const dataAccount = responseJSON.data;
               // console.log(dataAccount)
                setAccounts(dataAccount);
                if(!edit){
                    setTransaction({...transaction, account : dataAccount[0].id})
                }
              
               
            }
            else{
                console.log("No Connected");
                
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        GetAccounts();
        setEditData();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

   // UseEffect Configuration



 
    

// ---------- Post Transaction

const postTransaction = async () => {

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
        console.log("POST PUBLISHED!");
    }
    else {
        console.log("Error!");
        console.log( responseJSON);
    }
  }
  catch(err){
    console.log(err);
  }



}




     // ----- BodyForm/ Data Form Transaction POST

     let bodyForm = {
        'concept': "",
        'description': "",
        'ammount': 0,
        'date': "",
        'accountId': "",
        'candidateId': "a9d2b671-5550-44ee-a53a-49ea04380def"
     }

    // ------ MODAL CONFIGURATION BOOTSTRAP
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    //  ----------------

    // ----- FORM EVENT LISTENER

    // Getting Data by the form
    
    const handleChanges = (e) => {
        setTransaction({...transaction, hasChanged: true, [e.target.name] : e.target.value});
//console.log(transaction);
    }

// Saving data by the form
    const handleSubmit = async (e) => {
e.preventDefault();
// If is a post

// VALIDATIONS
if(!transaction.concept || !transaction.description || parseFloat(transaction.ammount) <= 0 || !transaction.date){
const x = transaction;
if(!x.concept){
    notify("NO PUEDES DEJAR EL CAMPO TITULO VACIO!");
}
if(!x.description){
    notify("NO PUEDES DEJAR EL CAMPO DESCRIPCION VACIO!");
}
if(parseFloat(x.ammount) <= 0){
    notify("NO PUEDES DEJAR EL CAMPO MONTO EN CERO O MENOR A CERO !");
}
if(!x.date){
    notify("NO PUEDES DEJAR EL CAMPO FECHA VACIO!");
}
}
else{
    if(!edit){
        bodyForm.concept = transaction.concept;
        bodyForm.description = transaction.description;
        bodyForm.date = transaction.date;
        bodyForm.ammount = parseFloat(transaction.ammount);
        bodyForm.accountId = transaction.account;
        
            await  postTransaction();
          //console.log("------- POST -----------")
         // console.log(bodyForm);
        
          
          
          
            window.location.href = "/";
          
        }
        // if is a Edit/Put
        else{
        let editBodyForm = {
            "id": editID,
            "concept": transaction.concept,
            "description": transaction.description,
            "ammount": parseFloat(transaction.ammount),
            "date": transaction.date
        }
        await EditTransaction(editBodyForm);
        //console.log("------- EDIT ----------")
        //console.log(editBodyForm);
        
        window.location.reload(false);
        }
    handleClose();
}


    }

    // ---------------
  
    return (
      <>
        <Button variant={edit ? "success" : "primary"} onClick={handleShow}>
          {edit ? "Editar Transacción" : "Nueva Transacción"}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{edit? "Editar Transacción" : "Crear Transacción"}</Modal.Title>
          </Modal.Header>
    
          <form className="row g-3" 
         onSubmit={handleSubmit}
          >
          <Modal.Body>
<div className="col-10">
    <label htmlFor="concept" className="form-label">Titulo</label>
<input className="form-control" 
    placeholder="Insert Concept" 
    name="concept" 
    value={transaction.concept}
    ref={iConcept}
    onChange={handleChanges}
    />
</div>
<div className="col-10">
   < label htmlFor="description" className="form-label">Descripción</label>
<textarea className="form-control" 
    placeholder="Insert Description" 
        name="description"
        value={transaction.description}
        onChange={handleChanges}
        ></textarea>
</div>
<div className="col-10">
< label htmlFor="ammount" className="form-label">Monto (Pesos)</label>
<input type="number" 
    className="form-control" 
        name="ammount" 
        value={transaction.ammount}
        onChange={handleChanges}
        />
</div>
<div className="col-10">
< label htmlFor="date" className="form-label">Fecha</label>
<input 
    className="form-control" 
    type="datetime-local" 
        name="date" 
        value={transaction.date}
        onChange={handleChanges}
        />
</div>
<div className="col-10">
< label htmlFor="account" className="form-label">Seleccionar Tipo de Cuenta</label>
{edit ? <select disabled className='form-control'>
<option>{ !accounts ? 
    "Cargando..."
    :  accounts.find(x => x.id === editAccount).type}</option>
</select>
:
<select name="account" onChange={handleChanges} className="form-control">
{!accounts ? <option value="n/a">CARGANDO...</option> : accounts.map((x) => (
    <option key={x.id} value={x.id}>{x.type}</option>
))}
</select>

}
</div>
</Modal.Body>
<Modal.Footer>
            <button className={!edit ? "btn btn-primary" : "btn btn-success"} >Guardar Transacción</button>
</Modal.Footer>
</form>
          
        
        </Modal>
        <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      </>
    );

}


const EditTransaction = async (transaction) => {

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
        console.log(responseJSON);
        
    }
    else{
        console.log("ERROR PUT");
        console.log(responseJSON);
    }
}
catch(err){
    console.log(err);
}

}

