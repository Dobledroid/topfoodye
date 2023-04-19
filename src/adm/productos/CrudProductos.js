import React, { useState, useEffect } from "react";
import Header from "../../estructura/Header";
import Footer from "../../estructura/Footer";
import AgregarProducto from "./AgregarProductos";
import EditarProducto from "./EditarProducto";
import EliminarProducto from "./EliminarProducto";
import { useNavigate } from 'react-router-dom';
import useInterval from "use-interval";
import './styles.css'

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

const CrudProductos = () => {

  const [articulos, setArticulos] = useState([]);
  // const [idCat, setCategoria] = useState("");
  const [cargando, setCargando] = useState(true);
  const [recuperado, setRecuperado] = useState(false);
  const [mostrarComponente, setMostrarComponente] = useState(null);
  const [prodEditando, setProdEditando] = useState(null);
  const [prodEliminando, setProdEliminando] = useState(null);

  //HANDLE INICIOS
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {

      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      setIsLoggedIn(loggedIn);
      if (user.tipo == "641e8a6fbab69569415ada99") {

      } else {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleEditar = (producto) => {
    setProdEditando(producto);
    setMostrarComponente("editar");
    setRecuperado(!recuperado);
  };
  const handleEliminar = (producto) => {
    setProdEliminando(producto);
    setMostrarComponente("eliminar");
  };

  const confirmarEliminar = async () => {
    setCargando(true);
    const response = await fetch(
      `https://api-rest-luis-r45f.vercel.app/products/${prodEliminando._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    setArticulos(articulos.filter((productos) => articulos._id !== data._id));
    // setCategoria(data.categorie);
    setProdEliminando(null);
    setCargando(false);
    setRecuperado(true);
    setMostrarComponente(null);
  };

  const obtenerDatos = async () => {
    try {
      const response = await fetch(
        "https://api-rest-luis-r45f.vercel.app/products"
      );
      const data = await response.json();
      setArticulos(data);
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
      <div style={{ marginTop: "80px" }}>
        <div style={styleBody} >
          <div style={card}>
            <h2 style={cardHeader}>Gestor de Productos</h2>
            <div className="icons">
              <i className="icon-search" id="search-icon"></i>
            </div>
            {cargando ? (
              <div>Cargando productos...</div>
            ) : mostrarComponente === "editar" ? (
              <EditarProducto
                articulos={prodEditando}
                guardarProdEditando={setProdEditando}
                guardarRecuperado={setRecuperado}
                cerrarComponente={() => setMostrarComponente(null)}
              />
            ) : mostrarComponente === "eliminar" ? (
              <EliminarProducto
                articulos={prodEliminando}
                confirmarEliminar={confirmarEliminar}
                cancelarEliminar={() => setMostrarComponente(null)}
              />
            ) : mostrarComponente === "agregar" ? (
              <AgregarProducto
                guardarRecuperado={setRecuperado}
                cerrarComponente={() => setMostrarComponente(null)}
              />
            ) : (
              <div>
                <button className="btn btn-primary" onClick={() => setMostrarComponente("agregar")} style={{ marginBottom: '20px' }}>
                  Agregar Producto
                </button>

                <div className="table-responsive">
                  <table className="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {articulos.map((producto) => (
                        <tr>
                          <td>{producto.name}</td>
                          <td>{producto.description.slice(0, 170)}...</td>
                          <td>{producto.price}</td>
                          <td>{producto.stock}</td>
                          <td><img src={producto.image.secure_url} width="100px" /></td>

                          <td>{producto.categorie.categorie}</td>
                          <td>
                            <button className="btn btn-warning" onClick={() => handleEditar(producto)}>
                              Editar
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handleEliminar(producto)}>
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

export default CrudProductos;