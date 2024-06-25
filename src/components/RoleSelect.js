import React from 'react';

const RoleSelect = ({ value, onChange }) => {
    return (
        <select value={value} onChange={onChange} required>
            <option value="administrador">Administrador</option>
            <option value="directora">Directora</option>
            <option value="secretaria">Secretaria</option>
            <option value="profesor">Profesor</option>
            <option value="jefa_utp">Jefa Utp</option>
        </select>
    );
};

export default RoleSelect;
