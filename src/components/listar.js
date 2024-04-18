import React, { useEffect, useState } from 'react';

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
        <div className="lista-container" key="lista">
            <div className="fila-titulos">
            <div className="titulo">Rut</div>
            <div className="titulo">Email</div>
            <div className="titulo">Nombre</div>
            <div className="titulo">Apellido</div>
          </div>
        {data.map(item => (
          <div className="fila" key={item.rut}>
            <div className="columna">{item.email}</div>
            <div className="columna">{item.nombre}</div>
            <div className="columna">{item.apellido}</div>
          </div>
        ))}
      </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ListarUsuarios;

  
