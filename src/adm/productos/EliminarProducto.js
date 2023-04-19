import React from 'react'

const EliminarProducto = ({ articulos, confirmarEliminar, cancelarEliminar }) => {
  return (
    <div className="container">
      <h2>Eliminar producto</h2>
      <p>¿Estás seguro que deseas eliminar al usuario {articulos.name}?</p>
      <button onClick={confirmarEliminar} className="btn btn-primary">Sí, eliminar</button>
      <button onClick={cancelarEliminar} style={{marginLeft: '20px'}} className="btn btn-secondary">Cancelar</button>
      
    </div>
  );
};

export default EliminarProducto