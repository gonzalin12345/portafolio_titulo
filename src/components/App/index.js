
import '../../App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginRequired from '../ProtectedRoute';  

import Login from '../login';

import Sidebar from '../sidebar/sidebar';
import RegistroUsuario from '../registrar';
import DeleteUsuario from '../delete';
import LoginUsuario from '../login';
import BuscarUsuario from '../buscar';
import ListarUsuarios from '../listar';
import EditarUsuario from '../editar';


function App() {
  /*
    return (
    <div className="App">
      <header className="App-header">        
      <LoginUsuario />
      </header>
    </div>
      */


    
  let loggedInStorage = localStorage.getItem('userLoggin');

  return <h1>Test</h1> 
/*
    return (
        <Router>
          <div className="App"> 
         
          <Sidebar />
          
            <div className="content">
              <Routes>
                <Route path="/registro" element={<RegistroUsuario />} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/delete" element={< DeleteUsuario/>} />
                <Route path="/buscar" element={<BuscarUsuario />} />
                <Route path="/listar" element={<ListarUsuarios />} />
                <Route path="/editar" element={<EditarUsuario />} />
              </Routes>
            </div>
          </div>  
        </Router>
      );

      */


}

export default App;
