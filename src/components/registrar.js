import React, { useState } from 'react';
import './registrar.css';
const RegistroUsuario = () => {
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

    console.log(JSON.stringify(formData))

    try {
     const response = await fetch('http://localhost:8000/api/v1/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
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
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className='registro'> 
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
       <div className='datos'>
        <label>
          <p>RUT </p> 
          <input
            type="text"
            name="rut"
            value={formData.rut}
            placeholder='21223034-4'
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Nombre</p>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            placeholder='martin'
            onChange={handleChange}
          />
        </label>
       </div> 
       <div className='datos'>
        <label>
          <p>Tipo de usuario</p> 
          <input
            type="text"
            name="tipo_usuario"
            value={formData.tipo_usuario}
            placeholder='user'
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Apellido</p>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            placeholder='perez'
            onChange={handleChange}
          />
        </label>
       </div>
       <div className='datos'>
        <label>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder='superhero@gmail.com'
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder='tu contraseña'
            onChange={handleChange}
          />
        </label>
       </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
