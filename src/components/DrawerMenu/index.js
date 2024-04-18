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

import { NavLink, useLocation } from 'react-router-dom';

export default function TemporaryDrawer({open, setOpen}) {
 
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
      display: 'Asistencia',
      to: '/asistencia',
    },
  

  ];
  

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => {
      setOpen(false)
    }}>
      <List>
        {sidebarNavItems.map((item, index) => (
          <ListItem key={item.display} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            
            <NavLink
           to={item.to}
           key={index}
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