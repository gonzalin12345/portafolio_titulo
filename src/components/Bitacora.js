import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Bitacora.css';

const Bitacora = () => {
  const [formData, setFormData] = useState({
    nombreCurso: '',
    nombreAsignatura: '',
    nombreProfesor: '',
    rutProfesor: '',
    descripcion: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfesorData();
  }, []);

  const fetchCursos = async (email) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/curso?email=${email}`);
      if (!response.ok) {
        throw new Error('Error al obtener cursos');
      }
      const data = await response.json();
      
      // Asumiendo que solo hay un curso asignado por profesor, puedes ajustar esto si hay múltiples cursos
      if (data.length > 0) {
        const cursoAsignado = data[0];
        setFormData(prevState => ({
          ...prevState,
          nombreCurso: cursoAsignado.nombre
        }));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfesorData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;
    if (!email) {
      console.error('Email no encontrado en localStorage');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/v1/profesor?email=${email}`);
      if (!response.ok) {
        throw new Error('Error al obtener datos del profesor');
      }
      const data = await response.json();
      if (data.length > 0) {
        const profesor = data[0];
        
        setFormData(prevState => ({
          ...prevState,
          nombreProfesor: `${profesor.nombre} ${profesor.apellido}`,
          rutProfesor: profesor.rut,
        }));
        
        fetchCursos(email); // Fetch cursos después de obtener el email del profesor
      } else {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "No se encontraron datos del profesor",
          icon: "error"
        });
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/bitacora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al registrar bitácora');
      }
      Swal.fire({
        title: "Bitácora Registrada",
        text: `Bitácora registrada correctamente`,
        icon: "success"
      });
      setFormData({
        nombreCurso: '',
        nombreAsignatura: '',
        nombreProfesor: '',
        rutProfesor: '',
        descripcion: ''
      });
    } catch (error) {
      console.error('Error al registrar bitácora:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bitacora">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Curso:
          <input type="text" name="nombreCurso" value={formData.nombreCurso} readOnly />
        </label>
        <label>
          Nombre Asignatura:
          <select name="nombreAsignatura" value={formData.nombreAsignatura} onChange={handleChange} required>
            <option value="">Seleccione.....</option>
            <option value="Matemáticas">Matemáticas</option>
            <option value="Ciencias">Ciencias</option>
            <option value="Historia">Historia</option>
            {/* Agrega más asignaturas según sea necesario */}
          </select>
        </label>
        <label>
          Rut Profesor:
          <input type="text" name="rutProfesor" value={formData.rutProfesor} readOnly />
        </label>
        <label>
          Nombre Profesor:
          <input type="text" name="nombreProfesor" value={formData.nombreProfesor} readOnly />
        </label>
        <label>
          Descripción de Bitácora:
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
        </label>
        <button type="submit">GUARDAR BITÁCORA</button>
      </form>
    </div>
  );
};

export default Bitacora;
