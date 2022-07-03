import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import DescriptionPage from './pages/DescriptionPage';
import NavBar from './components/NavBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';



function App() {


  return (
   
     
  <>
    <div className='w-100 bg-dark screen' >
       <BrowserRouter>
         
        
         <NavBar/>
         <div className="container-sm bg-light mt-3 mb-5">
       
      
       <div>
       <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/description/:id' element={<DescriptionPage />} />
     
      <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
       </div>
    
 
     
      </div>

     
      
  <footer className="text-center text-white bg-secondary ">
    
    
  
    <div className="text-center p-3" >
      © 2022 Copyright: 
      <a className="text-white" href="https://github.com/3CraneosDeLobo/Job-Nx-Test-App">Github/3CraneosDeLobo</a>
    </div>
    
  </footer>
        
     
       </BrowserRouter>
   
       </div>
  </>
  
  );
}

export default App;
