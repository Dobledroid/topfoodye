import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faSearch } from '@fortawesome/';

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

const Buscador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await axios.get("https://api-rest-luis-r45f.vercel.app/products")
      .then(response => {
        setUsuarios(response.data);
        setTablaUsuarios(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div className="App">
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre o Empresa"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          {/* <FontAwesomeIcon icon={faSearch} /> */}
        </button>
      </div>
      <div style={{ marginTop: "80px" }}>
        <div style={styleBody} >
          <div style={card}>
            <h2 style={cardHeader}>Gestor de Productos</h2>
            
              <div>


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
                      {usuarios.map((producto) => (
                        <tr>
                          <td>{producto.name}</td>
                          <td>{producto.description.slice(0, 170)}...</td>
                          <td>{producto.price}</td>
                          <td>{producto.stock}</td>
                          <td><img src={producto.image.secure_url} width="100px" /></td>

                          <td>{producto.categorie.categorie}</td>
     
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buscador
