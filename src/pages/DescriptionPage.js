import { useEffect } from "react";
import {useParams} from 'react-router-dom'
import Description from "../components/Description";


export default function DescriptionPage() {
    
    const params = useParams();


    useEffect(() => {
document.title = "Description";
    });

    return(<>
 
    <Description id={params.id}/>
    </>);
}