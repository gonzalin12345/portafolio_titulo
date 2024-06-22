import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import RegistroUsuario from './components/registrar';
import DeleteUsuario from './components/delete';
import LoginUsuario from './components/login';
import BuscarUsuario from './components/buscar';  
import ListarUsuarios from './components/listar';
import EditarUsuario from './components/editar';
import DrawerMenu from './components/DrawerMenu';
import Asistencia from './components/asistencia';

import ProtectedRoute from './components/ProtectedRoute';  




function App() {
  /*
    return (
    <div className="App">
      <header className="App-header">        
      <LoginUsuario />
      </header>
    </div>
      */

  const userLoggin = localStorage.getItem("accessToken"); 

  console.log(userLoggin);

  return (
    <Router>
      <div className="App"> 

          <Routes>
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/login" element={<LoginUsuario />} />

            <Route element={<ProtectedRoute user={userLoggin} />}>  
              <Route path="/delete" element={< DeleteUsuario/>} />
              <Route path="/buscar" element={<BuscarUsuario />} />
              <Route path="/listar" element={<ListarUsuarios />} />
              <Route path="/editar" element={<EditarUsuario />} />
              <Route path="/drawer" element={<DrawerMenu />} />
              <Route path="/asistencia" element={<Asistencia />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        
      </div>  
    </Router>
  );

 
  
}
   /* 
  return (
    <Router>
      <div className="App"> 
      {userLoggin &&
      <Sidebar />
      }
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


export default App;
