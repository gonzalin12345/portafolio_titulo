
import '../../App.css';
import { BrowserRouter as Router, Routes, Route, Navigate , Outlet  } from 'react-router-dom';


import Sidebar from '../sidebar/sidebar';
import DrawerMenu from '../DrawerMenu';

import * as React from 'react';


function ProtectedRoute({user, children}) {
  const userLoggin = localStorage.getItem("userLoggin");
  const [open, setOpen] = React.useState(false);

  function changeOpen(){

    console.log("change open");

   
   // setEmployeeData({...employee,[e.target.name]:e.target.value});

  }
  /*
    return (
    <div className="App">
      <header className="App-header">        
      <LoginUsuario />
      </header>
    </div>
      */
    console.log('protected route')
   console.log(user)
   console.log(children)
    if (!userLoggin) {
      return <Navigate to="/login" replace />;
    }
    

    return <div style={{display: 'flex', flex:1, flexDirection: 'column'}}>
      <div  style={{display: 'flex',flex:0.8}} className='side'> 
        <Sidebar   changeOpen={setOpen} />
       <DrawerMenu open={open} setOpen={setOpen}/> 
      </div>

      <div style={{display: 'flex', flex: 3, justifyContent: 'center', alignItems:'center'}}> 
         <Outlet />
      </div>
     
   
    </div>
    ;
  
   
}

export default ProtectedRoute;
