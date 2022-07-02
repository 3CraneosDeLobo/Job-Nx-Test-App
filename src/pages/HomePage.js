import Home from '../components/Home'
import {useEffect} from 'react';


function HomePage() {

useEffect(() => {
    document.title = "HOME";
});


    return(<>
    <Home/>
    </>)
}


export default HomePage;