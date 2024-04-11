import React, { useState } from 'react';

const BuscarUsuario = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    username: '',
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
     const response = await fetch('http://localhost:8000/api/v1/usuario/'+formData.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response)
      if (!response.ok) {
        alert('Usuario no existe');        
      }else{
        alert('Usuario Encontrado');
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
    <div className='RegistroUsuario'>
      <h2>Buscar usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          id:
          <input
            type="text"
            name="id"
            value={formData.ide}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default BuscarUsuario;
