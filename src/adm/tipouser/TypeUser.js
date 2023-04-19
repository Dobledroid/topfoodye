import React, { useState, useEffect } from "react";
import Header from "../../estructura/Header";
import Footer from "../../estructura/Footer";
import AgregarType from "./AgregarType";
import EditarType from "./EditarType";
import EliminarType from "./EliminarType";

import useInterval from "use-interval";

const styleBody = {
  backgroundColor: "#7A0244",
  color: "#fff",
  paddingTop: "5rem",
  paddingBottom: "5rem",

};

const card = {
  marginTop: "40px",
  backgroundColor: "#424242",
  borderColor: "#333",
  borderRadius: "1rem",
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
  padding: "2rem",
  margin: "auto",
  maxWidth: "65rem",
};

const cardHeader = {
  borderBottom: "none",
  textAlign: "center",
};

const TypeUser = () => {

  const [tipouser, setTipoUser] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [recuperado, setRecuperado] = useState(false);
  const [mostrarComponente, setMostrarComponente] = useState(null);
  const [tipoEditando, setTipoEditando] = useState(null);
  const [tipoEliminando, setTipoEliminando] = useState(null);

  const handleEditar = (tipo) => {
    setTipoEditando(tipo);
    setMostrarComponente("editar");
    setRecuperado(!recuperado);
  };
  const handleEliminar = (tipo) => {
    setTipoEliminando(tipo);
    setMostrarComponente("eliminar");
  };

  const confirmarEliminar = async () => {
    setCargando(true);
    const response = await fetch(
      `https://api-rest-luis-r45f.vercel.app/usertype/${tipoEliminando._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    setTipoUser(tipouser.filter((tipo) => tipouser._id !== data._id));
    // setCategoria(data.categorie);
    setTipoEliminando(null);
    setCargando(false);
    setRecuperado(true);
    setMostrarComponente(null);
  };

  const obtenerDatos = async () => {
    try {
      const response = await fetch(
        "https://api-rest-luis-r45f.vercel.app/usertype"
      );
      const data = await response.json();
      setTipoUser(data);
      setCargando(false);
      setRecuperado(true);
      console.log("corriendoTipoUsuario...")
    } catch (error) {
      console.log("Ha ocurrido un error al recuperar los datos: ", error);
    }
  };

  useInterval(obtenerDatos, 5000);


  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <div style={styleBody} >
          <div style={card}>
            <h2 style={cardHeader}>Gestor de roles de usuarios</h2>
            {cargando ? (
              <div>Cargando productos...</div>
            ) : mostrarComponente === "editar" ? (
              <EditarType
                tipo={tipoEditando}
                guardarProdEditando={setTipoEditando}
                guardarRecuperado={setRecuperado}
                cerrarComponente={() => setMostrarComponente(null)}
              />
            ) : mostrarComponente === "eliminar" ? (
              <EliminarType
                tipo={tipoEliminando}
                confirmarEliminar={confirmarEliminar}
                cancelarEliminar={() => setMostrarComponente(null)}
              />
            ) : mostrarComponente === "agregar" ? (
              <AgregarType
                guardarRecuperado={setRecuperado}
                cerrarComponente={() => setMostrarComponente(null)}
              />
            ) : (
              <div>
                <button className="btn btn-primary" onClick={() => setMostrarComponente("agregar")} style={{ marginBottom: '20px' }}>
                  Agregar nuevo rol
                </button>

                <div className="table-responsive">
                  <table className="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tipouser.map((type) => (
                        <tr>
                          <td>{type.type}</td>

                          <td>
                            <button className="btn btn-warning" onClick={() => handleEditar(type)}>
                              Editar
                            </button>
                            {"  "}
                            <button className="btn btn-danger" onClick={() => handleEliminar(type)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TypeUser;