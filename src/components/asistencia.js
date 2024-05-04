import React, { useState, useEffect } from 'react';
import './asistencia.css'

const PassAsistencia = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [asistencia, setAsistencia] = useState([]);

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
        } catch (error) {
            console.error(error);
        }
    };

    const handleAsistenciaChange = (estudiante, presente) => {
        const rut = estudiante.rut;
        const name = estudiante.nombre;
        const updatedAsistencia = [...asistencia];
        const index = updatedAsistencia.findIndex(item => item.rut === rut);
        if (index !== -1) {
            updatedAsistencia[index].presente = presente;   
        } else {
            updatedAsistencia.push({ rut, name, presente });
        }
        setAsistencia(updatedAsistencia);
    };

    const handleSubmit = async () => {
      

        const payload = asistencia.map((item) => {
           return  {
                "nombre_estudiante": item.name,
                "presente": item.presente,
                "justificacion": "sorry toy ocupao"
            }
        })

        console.log(payload)
       
        try {
            const response = await fetch('http://localhost:8000/api/v1/asistencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ payload }),
            });
            if (!response.ok) {
                throw new Error('Error al registrar asistencia');
            }
            alert('Asistencia registrada correctamente');
        } catch (error) {
            console.error(error);
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
                            checked={asistencia.find(item => item.rut === estudiante.rut)?.presente || false}
                            onChange={e => handleAsistenciaChange(estudiante, e.target.checked)}
                        />
                        <p>Ausente</p>  
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit}>Registrar Asistencia</button>
        </div>
            
    );
};

export default PassAsistencia;
