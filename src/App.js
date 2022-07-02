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
   
     
      
       <BrowserRouter>
       <div className="container-sm">
       
        <NavBar/>
        
     
       <Routes>
       <Route path='/' element={<HomePage/>} />
       <Route path='/description/:id' element={<DescriptionPage />} />
      
       <Route path='*' element={<NotFoundPage/>}/>
       </Routes>
      
       </div>
       </BrowserRouter>
   
     
  
  );
}

export default App;
