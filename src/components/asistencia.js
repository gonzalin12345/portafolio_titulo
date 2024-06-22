import React, { useState, useEffect } from 'react';
import './asistencia.css';

const PassAsistencia = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [asistencia, setAsistencia] = useState({});

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const fetchEstudiantes = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/estudiante');
            if (!response.ok) {
                throw new Error('Error al obtener estudiantes');
            }
            const data = await response.json();
            setEstudiantes(data);

            // Inicializar asistencia con todos los estudiantes
            const initialAsistencia = {};
            data.forEach(estudiante => {
                initialAsistencia[estudiante.rut] = {
                    nombre_estudiante: estudiante.nombre,
                    presente: false,
                    justificacion: 'No se presentó'
                };
            });
            setAsistencia(initialAsistencia);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAsistenciaChange = (estudiante, presente) => {
        const updatedAsistencia = { ...asistencia };
        updatedAsistencia[estudiante.rut] = {
            nombre_estudiante: estudiante.nombre,
            presente: presente,
            justificacion: presente ? '' : 'No se presentó'
        };
        setAsistencia(updatedAsistencia);
    };

    const handleSubmit = async () => {
        const payload = {
            asistencias: asistencia
        };

        console.log("Payload to be sent:", payload); // Depuración

        try {
            const response = await fetch('http://localhost:8000/api/v1/asistencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();
            if (!response.ok) {
                console.error("Error response from server:", responseText); // Depuración
                throw new Error('Error al registrar asistencia');
            }
            
            alert('Asistencia registrada correctamente');
        } catch (error) {
            console.error('Catch error:', error);
            alert('Error al registrar asistencia');
        }
    };

    return (
        <div className='asistencia'>
            <h2>Asistencia</h2>
            <ul>
                {estudiantes.map(estudiante => (
                    <li key={estudiante.rut}>
                        <p>{estudiante.nombre} {estudiante.apellido}</p>
                        <input
                            type="checkbox"
                            checked={asistencia[estudiante.rut]?.presente || false}
                            onChange={e => handleAsistenciaChange(estudiante, e.target.checked)}
                        />
                        <label>{asistencia[estudiante.rut]?.presente ? 'Presente' : 'Ausente'}</label>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit}>Registrar Asistencia</button>
        </div>
    );
};

export default PassAsistencia;
