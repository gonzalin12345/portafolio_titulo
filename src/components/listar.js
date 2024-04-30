import React, { useEffect, useState } from 'react';
import './lista.css';
const ListarUsuarios = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/usuario');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        
        /*<ul className='lista-bonita'>
          {data.map(item => (          
            <li className="item" key={item.id}>{item.email} {item.username} {item.nombre} {item.apellido} </li>
          ))}
        </ul>*/
        <div className='titulo'> 
          <h1> Aqui podra visualizar la informacion de todos los usuarios</h1>
        <div key="lista" className='lista-container'>
        {data.map(item => (
          <div key={item.rut} className='lista'>
            <div> Nombre: {item.nombre} </div>
            <div> Apellido: {item.apellido} </div>
            <div> Rut: {item.rut} </div>
            <div> Email: {item.email} </div>
          </div>
        ))}
        </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ListarUsuarios;

  
