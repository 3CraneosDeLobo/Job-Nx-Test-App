import { NavLink } from "react-router-dom";
import CreateTransaction from "./CreateTransaction";

export default function NavBar(){
    return(<>

    <nav className="navbar bg-light">
        <div className="container-fluid">
        <NavLink 
         className="navbar-brand"
          to='/'>
            HOME
            </NavLink>
         <div>
         <CreateTransaction edit={false}/>
         </div>
      
        </div>

    </nav>
      



    </>);
}