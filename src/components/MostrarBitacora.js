import React, { useState, useEffect } from 'react';
import './BitacoraList.css';

const BitacoraList = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/bitacoras/');
        if (!response.ok) {
          throw new Error('Error al obtener las bitácoras');
        }
        const data = await response.json();
        setBitacoras(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchBitacoras();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const formatRUT = (rut) => {
    let cleaned = rut.replace(/\./g, '').replace(/-/g, '');
    let dv = cleaned.slice(-1);
    let body = cleaned.slice(0, -1);
    let formatted = '';
    while (body.length > 3) {
      formatted = '.' + body.slice(-3) + formatted;
      body = body.slice(0, -3);
    }
    return body + formatted + '-' + dv;
  };

  const capitalizeName = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="bitacora-list">
      <h1>Lista de Bitácoras</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre del Curso</th>
            <th>Nombre Asignatura</th>
            <th>Nombre Profesor</th>
            <th>RUT Profesor</th>
            <th>Fecha</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {bitacoras.map(bitacora => (
            <tr key={bitacora.ide}>
              <td>{bitacora.nombreCurso}</td>
              <td>{bitacora.nombreAsignatura}</td>
              <td>{capitalizeName(bitacora.nombreProfesor)}</td>
              <td>{formatRUT(bitacora.rutProfesor)}</td>
              <td>{new Date(bitacora.fecha).toLocaleDateString()}</td>
              <td className="descripcion">{bitacora.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BitacoraList;
