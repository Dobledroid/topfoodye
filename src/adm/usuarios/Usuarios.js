import React, { useState, useEffect } from "react";
import Header from "../../estructura/Header";
import Footer from "../../estructura/Footer";
import AgregarUsuario from "./AgregarUsuario";
import EditarUsuario from "./EditarUsuario";
import EliminarUsuario from "./EliminarUsuario";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

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
  padding: "20px",
  margin: "auto",
  maxWidth: "65rem",
};

const cardHeader = {
  borderBottom: "none",
  textAlign: "center",
};

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [recuperado, setRecuperado] = useState(false);
  const [mostrarComponente, setMostrarComponente] = useState(null);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioEliminando, setUsuarioEliminando] = useState(null);

  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      setIsLoggedIn(loggedIn);
      if(user.tipo == "641e8a6fbab69569415ada99"){
        
      }else{
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);


  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setMostrarComponente("editar");
    setRecuperado(!recuperado);
  };
  const handleEliminar = (usuario) => {
    setUsuarioEliminando(usuario);
    setMostrarComponente("eliminar");
  };

  const confirmarEliminar = async () => {
    setCargando(true);
    const response = await fetch(
      `https://api-rest-luis-r45f.vercel.app/users/${usuarioEliminando._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    setUsers(users.filter((usuario) => usuario._id !== data._id));
    setUsuarioEliminando(null);
    setCargando(false);
    setRecuperado(true);
    setMostrarComponente(null);
  };

  const obtenerDatos = async () => {
    try {
      const response = await fetch(
        "https://api-rest-luis-r45f.vercel.app/users"
      );
      const data = await response.json();
      setUsers(data);
      setCargando(false);
      setRecuperado(true);
      console.log("ACT")
    } catch (error) {
      console.log("Ha ocurrido un error al recuperar los datos: ", error);
    }
  };

  useInterval(obtenerDatos, 5000);

  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px"}}>
      <div style={styleBody}>
        <div style={card}>
          <h2 style={cardHeader}>Gestor de USUARIOS</h2>

          {cargando ? (
            <div>Cargando usuarios...</div>
          ) : mostrarComponente === "editar" ? (
            <EditarUsuario
              usuario={usuarioEditando}
              guardarUsuarioEditando={setUsuarioEditando}
              guardarRecuperado={setRecuperado}
              cerrarComponente={() => setMostrarComponente(null)}
            />
          ) : mostrarComponente === "eliminar" ? (
            <EliminarUsuario
              usuario={usuarioEliminando}
              confirmarEliminar={confirmarEliminar}
              cancelarEliminar={() => setMostrarComponente(null)}
            />
          ) : mostrarComponente === "agregar" ? (
            <AgregarUsuario
              guardarRecuperado={setRecuperado}
              cerrarComponente={() => setMostrarComponente(null)}
            />
          ) : (
            <div>
              <button className="btn btn-primary" onClick={() => setMostrarComponente("agregar")} style={{ marginBottom: '20px' }}>
                Agregar Usuario
              </button>
              <div className="table-responsive">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Contraseña</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((usuario) => (
                      <tr key={usuario._id} >
                        <td>{usuario.name}</td>
                        <td>{usuario.password}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.typeUser.type}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEditar(usuario)}
                          >
                            Editar
                          </button>
                          {"  "}
                          <button
                            className="btn btn-danger"
                            onClick={() => handleEliminar(usuario)}
                          >
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

export default Usuarios;
