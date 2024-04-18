
import '../../App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginRequired from '../ProtectedRoute';  

import Login from '../login';
import Buscar from '../buscar';
import App from '../App';




function ActuallyMainApp() {
  /*
    return (
    <div className="App">
      <header className="App-header">        
      <LoginUsuario />
      </header>
    </div>
      */


    
  let loggedInStorage = localStorage.getItem('userLoggin');

  return (

      <Routes>
        <Route exact path='/' element={<LoginRequired/>}>
             <Route exact path='/' element={<Buscar/>}/>
        </Route>
        <Route path="/login/" element={Login} />
       
        <Route element={App} />
      </Routes>

  );
}

export default ActuallyMainApp;
