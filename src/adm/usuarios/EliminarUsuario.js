import React from "react";

const EliminarUsuario = ({ usuario, confirmarEliminar, cancelarEliminar }) => {
  return (
    <div className="container">
      <h2>Eliminar usuario</h2>
      <p>¿Estás seguro que deseas eliminar al usuario {usuario.name}?</p>
      <button onClick={confirmarEliminar} className="btn btn-primary" >Sí, eliminar</button>
      <button onClick={cancelarEliminar} style={{marginLeft: '20px'}} className="btn btn-secondary" >Cancelar</button>
      
    </div>
  );
};

export default EliminarUsuario;
