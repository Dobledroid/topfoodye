import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditarType = ({ tipo, guardarUsuarioEditando, guardarRecuperado, cerrarComponente }) => {
  const [id, setId] = useState(tipo._id);
  const [type, setTipo] = useState(tipo.type);
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://api-rest-luis-r45f.vercel.app/usertype", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type }),
    });

    if (response.status === 200) {
      // console.log("Status 200 OK");


      const data = await response.json();
      // console.log(data)
      guardarRecuperado((r) => !r);
      
      Swal.fire({
        title: "Insertado",
        text: "Documento insertado con éxito",
        icon: "success",
        confirmButtonText: "Cerrar",
      }).then((result) => {
        if (result.isConfirmed) {
          // window.location.reload();
          cerrarComponente();
        }
      });
    } else {
      // console.log("Ha ocurrido un error");
      Swal.fire({
        title: "Error",
        text: "Documentos no insertados",
        icon: "error",
        confirmButtonText: "Cerrar",
      })
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese tipo de usuario"
            required
            value={type}
            onChange={(event) => setTipo(event.target.value)}
          />
        </div>
        

        <br />
        <button type="submit" className="btn btn-primary">
          Agregar rol
        </button>

        <button type="submit" className="btn btn-secondary" onClick={() => { cerrarComponente() }} style={{ marginLeft: '20px' }}>
          Regresar
        </button>
      </form>
      <br />

    </div>
  )
};

export default EditarType
