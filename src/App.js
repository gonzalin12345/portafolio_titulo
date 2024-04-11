import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import RegistroUsuario from './components/registrar';
import DeleteUsuario from './components/delete';
import LoginUsuario from './components/login';
import BuscarUsuario from './components/buscar';
import ListarUsuarios from './components/listar';
import EditarUsuario from './components/editar';  




function App() {
  /*return (
    <div className="App">
      <header className="App-header">        
      <ListarUsuarios />
      </header>
    </div>*/ 
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/registro" component={RegistroUsuario} />
          <Route path="/delete" component={DeleteUsuario} />
          <Route path="/login" component={LoginUsuario} />
          <Route path="/buscar" component={BuscarUsuario} />
          <Route path="/listar" component={ListarUsuarios} />
          <Route path="/editar" component={EditarUsuario} />
        </Switch>
      </div>
    </Router> 
  );
}

export default App;
