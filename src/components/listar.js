import React, { useEffect, useState } from 'react';
import './lista.css';
import jQuery from "jquery";
import DataTable from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import Spanish from './Spanish.json';


const ListarUsuarios = () => {
  const [data, setData] = useState([]);

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

  useEffect(() => {
    if (data.length > 0) {
      const table = new DataTable(jQuery('#usuarios'), {
        data: data.map(item => [item.nombre, item.apellido, item.rut, item.email, item.tipo_usuario]),
        columns: [
          { title: "Nombre" },
          { title: "Apellido" },
          { title: "RUT" },
          { title: "Email" },
          { title: "Tipo Usuario" }
        ],
        responsive: true,
        buttons: ['copy', 'excel', 'pdf'],
        language: Spanish,
        initComplete: function() {
          // Aquí puedes agregar IDs a elementos específicos
          jQuery('#usuarios thead tr th').each(function(index) {
            jQuery(this).attr('id', `header-${index}`);
          });
          jQuery('#usuarios dt-layout-row').each(function(index) {
            jQuery(this).attr('id', `row-${index}`);
            jQuery(this).css({
              'display':'flex',
              'justify-content': 'space-between'
            });
          });
        }
      });

      return () => {
        table.destroy();
      };
    }
  }, [data]);

  return (
    <div className='contenedor'>
      <h1>Aquí podrá visualizar la información de todos los usuarios</h1>
      {data.length > 0 ? (
        <table id='usuarios' className='display nowrap' style={{width: '100%'}}></table>  
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ListarUsuarios;
   