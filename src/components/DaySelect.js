import React from 'react';

const DaySelect = ({ value, onChange }) => {
    return (
        <select value={value} onChange={onChange} required>
            <option value="lunes">Lunes</option>
            <option value="maryes">Martes</option>
            <option value="miercoles">Miercoles</option>
            <option value="jueves">Jueves</option>
            <option value="viernes">Viernes</option>
        </select>
    );
};

export default DaySelect;