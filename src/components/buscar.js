import React, { useState } from 'react';
import './buscar.css'
import Swal from 'sweetalert2'

const BuscarUsuario = () => {
  // Estado para almacenar los datos del usuario buscado
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  // Estado para almacenar el valor del RUT ingresado en el formulario
  const [rut, setRut] = useState('');

  // Manejar cambios en el campo de RUT del formulario
  const handleChange = (e) => {
    setRut(e.target.value);
  };

  const findUser = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`http://localhost:8000/api/v1/usuario/buscar/${rut}`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`
         }
       });
       console.log(response)
       if (!response.ok) {
         Swal.fire({
          title: "Usuario No encontrado",
          text: `Ingrese un rut correcto`,
          icon: "success"
        });
       } else {
         const userData = await response.json();
         Swal.fire({
          title: "Usuario encontrado",
          text: `Rut correcto`,
          icon: "success"
        });
         setUsuarioEncontrado(userData);
       }
     } catch (error) {
       console.error('Error al buscar usuario:', error);
     }
  }

  return (
    <div className='container'>  
      <form className='buscar'>
        <label>
          <p>Buscar usuario por RUT</p>
          <input
            type="text"
            value={rut}
            onChange={handleChange}
            placeholder='212345014'
          />
        </label>
        <button onClick={findUser}>Buscar</button>
      </form>
      {usuarioEncontrado && (
        <div className='buscado'>
          <p>Rut: {usuarioEncontrado.rut}</p>
          <p>Nombre: {usuarioEncontrado.nombre}</p>
          <p>Apellido: {usuarioEncontrado.apellido}</p>
          <p>Tipo de usuario: {usuarioEncontrado.tipo_usuario}</p>
          <p>Email: {usuarioEncontrado.email}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarUsuario;
