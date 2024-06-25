import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './asignarCurso.css';

const AsignarCurso = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cantidadAlumno: '',
    profesor: '',
    rutProfesor: '',
    dias: [],
    nombreEstudiante: '',
    rutEstudiante: ''
  });
  const [profesores, setProfesores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);

  useEffect(() => {
    fetchProfesores();
    fetchEstudiantes();
  }, []);

  const fetchProfesores = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/profesor');
      if (!response.ok) {
        throw new Error('Error al obtener profesores');
      }
      const data = await response.json();
      setProfesores(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEstudiantes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/estudiante');
      if (!response.ok) {
        throw new Error('Error al obtener estudiantes');
      }
      const data = await response.json();
      setEstudiantes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dias") {
      const selectedDias = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prevState => ({
        ...prevState,
        [name]: selectedDias
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleEstudianteSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = estudiantes.filter(estudiante =>
      estudiante.nombre.toLowerCase().includes(query) || estudiante.apellido.toLowerCase().includes(query)
    );
    setFilteredEstudiantes(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedProfesor = profesores.find(prof => prof.rut === formData.profesor);
    const selectedEstudiante = estudiantes.find(est => est.rut === formData.rutEstudiante);
    const cursoData = {
      ...formData,
      dias: formData.dias.join(','),
      profesor: selectedProfesor ? `${selectedProfesor.nombre} ${selectedProfesor.apellido}` : '',
      rutProfesor: selectedProfesor ? selectedProfesor.rut : '',
      nombreEstudiante: selectedEstudiante ? selectedEstudiante.nombre : '',
      rutEstudiante: selectedEstudiante ? selectedEstudiante.rut : ''
    };
    console.log(JSON.stringify(cursoData));
    try {
      const response = await fetch('http://localhost:8000/api/v1/curso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cursoData),
      });
      if (!response.ok) {
        throw new Error('Error al registrar curso');
      }
      Swal.fire({
        title: "Curso Registrado",
        text: `Curso ${formData.nombre} registrado correctamente`,
        icon: "success"
      });
      setFormData({
        nombre: '',
        cantidadAlumno: '',
        profesor: '',
        rutProfesor: '',
        dias: [],
        nombreEstudiante: '',
        rutEstudiante: ''
      });
    } catch (error) {
      console.error('Error al registrar curso:', error);
    }
  };

  return (
    <div className="asignar-curso">
      <h1>Asignar Curso</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Curso:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <label>
          Cantidad de Alumnos:
          <input type="number" name="cantidadAlumno" value={formData.cantidadAlumno} onChange={handleChange} required />
        </label>
        <label>
          Seleccione el Nombre del Profesor:
          <select name="profesor" value={formData.profesor} onChange={handleChange} required>
            <option value="">Seleccione</option>
            {profesores.map(profesor => (
              <option key={profesor.rut} value={profesor.rut}>{profesor.nombre} {profesor.apellido}</option>
            ))}
          </select>
        </label>
        <label>
          Seleccione Días de clases:
          <select name="dias" multiple value={formData.dias} onChange={handleChange} required>
            <option value="lunes">Lunes</option>
            <option value="martes">Martes</option>
            <option value="miercoles">Miércoles</option>
            <option value="jueves">Jueves</option>
            <option value="viernes">Viernes</option>
          </select>
        </label>
        <label>
          Buscar Estudiantes:
          <input type="text" onChange={handleEstudianteSearch} placeholder="Buscar Estudiantes" />
          <select name="rutEstudiante" value={formData.rutEstudiante} onChange={handleChange} required>
            <option value="">Seleccione</option>
            {filteredEstudiantes.map(estudiante =>(
              <option key={estudiante.rut} value={estudiante.rut}>{estudiante.nombre} {estudiante.apellido}</option>
            ))}
          </select>
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AsignarCurso;
