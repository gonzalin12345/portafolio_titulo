import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const LoginUsuario = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const userLoggin = localStorage.getItem("userLoggin");

  if(userLoggin) {
    navigate('/buscar');
  }

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

        const data = await response.json();
        localStorage.setItem("userLoggin", JSON.stringify(data));

        navigate('/buscar')
  
        
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
    <div className='login'>
      <h1> Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Correo electrónico</p>
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
            placeholder='tu constraseña'
            onChange={handleChange}
          />
        </label>
        <button type="submit">Iniciar sesión</button>
        <a>¿Olvidaste la contraseña?</a> 
      </form>
    </div>
  );
};

export default LoginUsuario;
