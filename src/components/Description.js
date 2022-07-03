import { useEffect, useState } from "react";
import CreateTransaction from './CreateTransaction';
import moment from "moment";
import {Link} from 'react-router-dom'
import { GetTransaction } from "./ApiCalls";


export default function Description({id}){
    const [transaction, setTransaction] = useState();

    const fetchApiTransaction = async () => {
     const {success, dataTransaction} = await GetTransaction(id);          
 if(success){
  setTransaction(dataTransaction);
 }
    }
  
  useEffect(() => {
  fetchApiTransaction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





    return(
    <>
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
    </>
    );
}