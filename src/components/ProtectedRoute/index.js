import '../../App.css';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import DrawerMenu from '../DrawerMenu';
import * as React from 'react';

function ProtectedRoute({ allowedRoles }) {
  const userLoggin = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = React.useState(false);

  if (!userLoggin  || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.tipo_usuario)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 0.8 }} className='side'>
        <Sidebar changeOpen={setOpen} />
        <DrawerMenu open={open} setOpen={setOpen} />
      </div>
      <div style={{ display: 'flex', flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedRoute;
