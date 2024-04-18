import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.css';

import Button from '@mui/material/Button';





  /*return (*/
    /*
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Logo</div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/registro" className="nav-link">Registro</Link>
          </li> 
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/buscar" className="nav-link">Buscar</Link>
          </li>
          <li className="nav-item">
            <Link to="/listar" className="nav-link">Listar</Link>
          </li>
          <li className="nav-item">
            <Link to="/editar" className="nav-link">Editar</Link>
          </li>
          <li className="nav-item">
            <Link to="/delete" className="nav-link">Eliminar</Link>
          </li>
        </ul>
      </div>
    </nav>*/
    
  /*);*/


const Sidebar = ({changeOpen}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('here')
    localStorage.removeItem('userLoggin');
    navigate('/login');
  }

 

  const sidebarNavItems = [
    {
      display: 'Buscar',
      to: '/buscar',
    },
    {
      display: 'Eliminar',
      to: '/delete',
    },
    {
      display: 'Listar',
      to: '/listar',
    },
    {
      display: 'Editar',
      to: '/editar',
    },
    {
      display: 'Drawer',
      to: '/drawer',
    },

  ];

  useEffect(() => {
   
  }, []);

  useEffect(() => {
    const curPath = location.pathname.split('/')[1];
    const activeItem = sidebarNavItems.findIndex(item => item.to.split('/')[1] === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location, sidebarNavItems]);

  return (
    <div className='sidebar'>

      <Button onClick={() => {
      changeOpen(true)
      }} >Open drawer</Button>
      <button onClick={handleLogout}>Sign Out</button>
    </div>    
  );

}


export default Sidebar;
