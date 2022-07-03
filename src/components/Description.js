import { useEffect, useState } from "react";
import CreateTransaction from './CreateTransaction';
import moment from "moment";
import {Link} from 'react-router-dom'


export default function Description({id}){
    const [transaction, setTransaction] = useState();

    const url = "http://63.135.170.173:5000/transactions";
   
  
   let myHeaders = new Headers({
  Authorization: 'a9d2b671-5550-44ee-a53a-49ea04380def'
    });
    
    let myInit = {
       method: 'get',
      headers: myHeaders
    };
  
    let myRequest = new Request(url, myInit);
  
  
  
    const fetchApiTransaction = async () => {
      try{
        const response = await fetch(myRequest);
        if(response.ok){
          const responseJSON = await response.json();
          const dataTransactions = responseJSON.data;
          const dataTransaction = dataTransactions.find(x => x.id === id);
        //  console.log(response.status);
          console.log("API CONECTED!")
       //   console.log(dataTransaction);
          setTransaction(dataTransaction);
        }
     
      }
      catch(err){
        console.log(err)
      }
     
    }
  
  
  useEffect(() => {
  
  fetchApiTransaction();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





    return(<>
    {!transaction ? "404 Not Found" : <div className="mx-auto  p-3">
        <h3> <strong>Titulo:</strong>   {transaction.concept}</h3>
        <h3><strong>Monto:</strong> {transaction.ammount} Pesos</h3>
        <h3><strong>Fecha:</strong> {moment(transaction.date).format('D/MM/YYYY h:mm a')}</h3>
        <h3>{!transaction.description ? "" : <p><strong>Descripción:</strong>  {transaction.description}</p>}</h3>
        {
        transaction.candidateId === "a9d2b671-5550-44ee-a53a-49ea04380def"
        ?
        <CreateTransaction 
        edit={true} 
        editID={transaction.id}
        editConcept={transaction.concept}
        editAmmount={transaction.ammount}
        editDate={transaction.date}
        editDescription={transaction.description}
        editAccount={transaction.accountId}
        />
        : 
        <div className="alert alert-info">Esta Transaccion no puede ser editada</div>
        
        
        }
        <Link className="btn btn-info d-block mt-3" to="/"><strong>Regresar al inicio</strong></Link>  
    </div>}
  
    </>);
}