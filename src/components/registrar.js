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
       <div>
        <label>
          <p>RUT </p> 
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
          />
        </label>
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>
       </div> 
       <div>
        <label>
          Tipo de usuario
          <input
            type="text"
            name="tipo_usuario"
            value={formData.tipo_usuario}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </label>
       </div>
       <div>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
       </div>
        <div style={{flexDirection: 'column'}}>
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default RegistroUsuario;
