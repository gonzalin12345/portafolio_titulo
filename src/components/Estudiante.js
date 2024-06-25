import React, { useState } from 'react';
import './Estudiante.css';
import Swal from 'sweetalert2';

const RegistroEstudiante = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    edad: '',
    sexo: '',
    nacionalidad: '',
    fecha_nac: ''
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

    console.log(JSON.stringify(formData));

    try {
      const response = await fetch('http://localhost:8000/api/v1/estudiante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const nombre = formData.nombre;
      const apellido = formData.apellido;

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      Swal.fire({
        title: "Estudiante Registrado",
        text: `Estudiante ${nombre} ${apellido} Registrado`,        
        icon: "success"
      });

      // Limpiar el formulario después del registro exitoso
      setFormData({
        rut: '',
        nombre: '',
        apellido: '',
        edad: '',
        sexo: '',
        nacionalidad: '',
        fecha_nac: ''
      });
      
    } catch (error) {
      console.error('Error al registrar estudiante:', error);
    }
  };

  return (
    <div className='estudiante'> 
      <form onSubmit={handleSubmit}>
        <div className='datos'>
          <label>
            <p>RUT</p> 
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
            <p>Apellido</p>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              placeholder='perez'
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Edad</p>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              placeholder='20'
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='datos'>
          <label>
            <p>Sexo</p>
            <input
              type="text"
              name="sexo"
              value={formData.sexo}
              placeholder='masculino'
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Nacionalidad</p>
            <input
              type="text"
              name="nacionalidad"
              value={formData.nacionalidad}
              placeholder='chileno'
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='datos'>
          <label>
            <p>Fecha de Nacimiento</p>
            <input
              type="date"
              name="fecha_nac"
              value={formData.fecha_nac}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Registrar Estudiante</button>
      </form>
    </div>
  );
};

export default RegistroEstudiante;
