import React, { useState } from 'react';

const LoginUsuario = () => {
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

    console.log(JSON.stringify(formData))

    try {
     const response = await fetch('http://localhost:8000/api/v1/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response)
        alert('Usuario no Registrado');
        //throw new Error('Network response was not ok');
      } else {
        alert('Login Exitoso');
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
      <h2> Iniciar sesion</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginUsuario;
