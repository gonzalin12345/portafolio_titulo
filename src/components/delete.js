import React, { useState } from 'react';
import './delete.css'
import Swal from 'sweetalert2'


const DeleteUsuario = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    rut:'',
    nombre: '',
    apellido: '',
    tipo_usuario: '',
    email: '',
    password: ''
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //let dataJson =JSON.stringify(formData); 
   console.log(formData.id)
    try {
      const accessToken = localStorage.getItem("accessToken");
     const response = await fetch('http://localhost:8000/api/v1/usuario/delete/'+formData.rut, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        Swal.fire({
          title: "Usuario No eliminado",
          text: `Rut incorrecto`,
          icon: "success"
        });
      }else{
        Swal.fire({
          title: "Usuario Eliminado",
          text: `Rut Correcto`,
          icon: "success"
        });
      }
     
       /*

      // Limpiar el formulario después del registro exitoso
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        username: '',
        password: ''
      });
 */
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className='delete'>
      <form onSubmit={handleSubmit}>
        <label>
          <p> Eliminar usuario por RUT:</p>
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Eliminar</button>
      </form>
    </div>
  );
};

export default DeleteUsuario;
