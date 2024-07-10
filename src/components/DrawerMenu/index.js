import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { GoSearch } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { MdAssignmentAdd } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import './DrawerMenu.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function TemporaryDrawer({open, setOpen}) {
  const navigate = useNavigate();
  const userLoggin = localStorage.getItem('accessToken');
  const user = userLoggin ? JSON.parse(localStorage.getItem('user')) : null;      

  const sidebarNavItems = [

    
    {
      display: 'Eliminar',
      to: '/delete',
      icon: <BsTrash />,
      roles: ['admin', 'directora', 'profesor', 'jefa utp', 'secretaria']

    },
    {
      display: 'Listar',
      to: '/listar',
      icon: <FaListUl />,
      roles: ['admin', 'directora', 'profesor', 'jefa utp', 'secretaria']
    },
    

    {
      display: 'Estudiante',
      to: '/estudiante',
      icon:<PiStudent />,
      roles: ['admin','directora','profesor', 'jefa utp', 'secretaria']
    },    
    {
      display: 'AsignarCurso',
      to: '/asignarCurso',
      icon:<MdAssignmentAdd />,
      roles: ['admin','directora','profesor', 'jefa utp', 'secretaria']
    },   
      

  ];


  const handleLogout = () => {
    console.log('here')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  const DrawerList = (
    <Box sx={{ backgroundColor: '#050038', paddingBottom:0, width: 250, '@media (max-width: 700px)': {width: 200,}, 
    }}  role="presentation" onClick={() => {
      setOpen(false)
    }}>
      <List>
      {sidebarNavItems.filter(item => item.roles.includes(user.tipo_usuario)).map((item, index) => (
          <ListItem key={item.display} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <NavLink to={item.to} style={{ textDecoration: 'none' }}>
                <ListItemText primary={item.display} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider  />     
      <div className='logout-container'>
        <button onClick={handleLogout} className='logout'>Cerrar sesion</button>
      </div> 
    </Box>
    
  );


  return (
    <div>
    
      <Drawer 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#050038',
          },

        }}>
        {DrawerList}
      </Drawer>
    </div>
  );
}