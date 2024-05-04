import React, { useState } from 'react';
import './editar.css'

const EditarUsuario = () => {
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


    try {
     const response = await fetch('http://localhost:8000/api/v1/usuario/update/'+ formData.rut, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert('Error al editar');
      }else{
        alert('Edit exitoso');
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
      console.error('Error al Editar usuario:', error);
    }
  };

  return (
    <div className='editar'>
      <form onSubmit={handleSubmit}>
        <div> 
          <label>
            <p>Rut del usuario:</p> 
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder='213783940'
            />
          </label>
          <label>
            <p>Tipo de usuario:</p>
            <input
              type="text"
              name="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleChange}
              placeholder='admin'
            />
          </label>
        </div>
        <div>
          <label>
            <p>Nombre:</p> 
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder='patin'
            />
          </label>
          <label>
            <p>Email:</p> 
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='patin@gmail.com'
            />
          </label>
        </div>
        <div>
          <label>
              <p>Apellido:</p> 
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder='zuniga'
              />
          </label>
          <label>
            <p>Contraseña:</p> 
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='tu contraseña'
            />
          </label>
        </div>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
