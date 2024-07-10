import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaCurso.css'; // Asegúrate de tener un archivo CSS para estilizar la vista
import Swal from 'sweetalert2';

const ListaCurso = () => {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;

    if (!email) {
      console.error('Email no encontrado en localStorage');
      Swal.fire({
        title: 'Error',
        text: 'Email no encontrado. Inicia sesión nuevamente.',
        icon: 'error'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/curso?email=${email}`);
      if (!response.ok) {
        throw new Error('Error al obtener cursos');
      }
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron obtener los cursos',
        icon: 'error'
      });
    }
  };

  return (
    <div className="lista-cursos">
      <p>Estos son sus cursos asignados</p>
      {cursos.map(curso => (
        <div key={curso.ide} className="curso-item">
          <p>Nombre del curso: {curso.nombre}</p>
          <div className="curso-buttons">
            <button className="asistencia-button" onClick={() => navigate(`/asistencia/${curso.ide}`)}>IR A ASISTENCIA</button>
            <button className="notas-button" onClick={() => navigate(`/notas/${curso.ide}`)}>IR A NOTAS</button>
            <button className="anotacion-button" onClick={() => navigate(`/anotacion/${curso.ide}`)}>IR A ANOTACIÓN</button>
            <button className="citacion-button" onClick={() => navigate(`/citacion/${curso.ide}`)}>IR A CITACIÓN</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaCurso;
