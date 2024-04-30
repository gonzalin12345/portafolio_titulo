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

import { NavLink, useLocation } from 'react-router-dom';

export default function TemporaryDrawer({open, setOpen}) {
 
  const sidebarNavItems = [
    {
      display: 'Buscar',
      to: '/buscar',
      icon: <GoSearch />,
    },
    {
      display: 'Eliminar',
      to: '/delete',
      icon: <BsTrash />,

    },
    {
      display: 'Listar',
      to: '/listar',
      icon: <FaListUl />,
    },
    {
      display: 'Editar',
      to: '/editar',
      icon: <FaUserEdit />,
    },
    {
      display: 'Asistencia',
      to: '/asistencia',
      icon:<MdOutlineAssignmentInd />,
    },

  

  ];
  

  const DrawerList = (
    <Box sx={{ backgroundColor: '#050038', paddingBottom:47, width: 250, '@media (max-width: 700px)': {width: 200,}, 
    }}  role="presentation" onClick={() => {
      setOpen(false)
    }}>
      <List>
        {sidebarNavItems.map((item, index) => (
          <ListItem key={item.display} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            
            <NavLink
           to={item.to}
           key={index}
           style={{textDecoration: 'none'}}
         // Esta clase se aplicará cuando el enlace esté activo
         >
        <ListItemText primary={item.display} />
         </NavLink>
          </ListItemButton>
        </ListItem>
          
        ))}
      </List>
      <Divider />      
    
    </Box>
    
  );


  return (
    <div>
    
      <Drawer open={open} onClose={() => {
        setOpen(false)
      }}>
        {DrawerList}
      </Drawer>
    </div>
  );
}