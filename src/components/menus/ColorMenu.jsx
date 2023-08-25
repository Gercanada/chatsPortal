import React from 'react';
import './ColorMenu.css'; // Estilos CSS para el menú de colores

const ColorMenu = ({ colors, onSelect }) => {
  return (
    <div className="color-menu">
      {colors.map(color => (
        <div
          key={color}
          className="color-option"
          style={{ backgroundColor: color }}
          onClick={() => onSelect(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorMenu;
