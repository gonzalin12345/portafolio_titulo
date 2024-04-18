import React, { useState } from 'react';

const BuscarUsuario = () => {
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


  const findUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/usuario/'+formData.rut, {
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
  }

  // Manejar el envío del formulario


  return (
    <div className='RegistroUsuario'>
      <h2>Buscar usuario</h2>
      <form >
        <label>
          rut:
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
          />
        </label>
        <button onClick={findUser}>Buscar</button>
      </form>
    </div>
  );
};

export default BuscarUsuario;
