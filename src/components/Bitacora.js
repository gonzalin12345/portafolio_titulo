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
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfesorData();
  }, []);

  const fetchCursos = async (rutProfesor) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/curso');
      if (!response.ok) {
        throw new Error('Error al obtener cursos');
      }
      const data = await response.json();
      setCursos(data);

      const cursoAsignado = data.find(curso => curso.rutProfesor === rutProfesor);
      setFormData(prevState => ({
        ...prevState,
        nombreCurso: cursoAsignado ? cursoAsignado.nombre : ''
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfesorData = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await fetch(`http://localhost:8000/api/v1/profesor?email=${email}`);
      if (!response.ok) {
        throw new Error('Error al obtener datos del profesor');
      }
      const data = await response.json();
      const profesor = data[0];
      
      setFormData(prevState => ({
        ...prevState,
        nombreProfesor: `${profesor.nombre} ${profesor.apellido}`,
        rutProfesor: profesor.rut,
      }));
      
      fetchCursos(profesor.rut); // Fetch cursos después de obtener el rut del profesor
    } catch (error) {
      console.error(error);
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
      <h1>Registro de Bitácora</h1>
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
