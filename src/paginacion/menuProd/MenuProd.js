import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Footer from "../../estructura/Footer";
import Header from "../../estructura/Header";
// import "./Platillos.css";

// import { SessionContext } from '../contexts/SessionContext';
import { useNavigate } from "react-router-dom";


const MenuProd = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [articulos, setArticulos] = useState([]);
  const [categoria, setCategoria] = useState('');

  const handleTodos = () => {
    // setBusqueda('');
    setCategoria('');
    // peticionGet();
  };

  const handleDesayuno = () => {
    // setBusqueda('');
    setCategoria('641f6a66e60485c0d8ddd433');
  };

  const handleComidas = () => {
    // setBusqueda('');
    setCategoria('641f6a5de60485c0d8ddd431');
  };

  const handleBebidas = () => {
    // setBusqueda('');
    setCategoria('641f6a6be60485c0d8ddd435');
  };


  const peticionGet = async () => {
    await axios.get("https://api-rest-luis-r45f.vercel.app/products")
      .then(response => {
        setProductos(response.data);
        setTablaProductos(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaProductos.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    });
    setProductos(resultadosBusqueda);
  }

  useEffect(() => {
    // handleMenu();
    peticionGet();
  }, [])


  const handleClick = (_id) => {
    // navigate(`/producto/${_id}`);
    // console.log("Click"+ _id)
    navigate('/producto', { state: {_id: _id} } )
  };

  return (
    <div>
      <Header />
      <h1 className="titlePlatillos">Consulta nuestro menú, sabroso 😏🥵</h1>
      <div className="container-fluid ml-4">
        <div>
          <form className="d-flex" >
            <input className="form-control" type="search" placeholder="Buscar" aria-label="Buscar" value={busqueda} onChange={handleChange} style={{
              marginLeft: '50px', marginRight: '1rem'
            }} />
            {/* <button className="btn btn-outline-success" type="submit" style={{
              marginRight: '50px'
            }}>Buscar</button> */}
          </form>
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 d-flex justify-content-center">
            <div id="menu-flters">
              <button
                data-filter="btn btn-primary"
                className={categoria === '' ? 'btn btn-success m-3' : 'btn btn-primary m-3'}
                onClick={handleTodos}
              >
                Todos
              </button>
              <button
                data-filter=".filter-starters"
                className={categoria === '641f6a66e60485c0d8ddd433' ? 'btn btn-success m-3' : 'btn btn-primary m-3'}
                onClick={handleDesayuno}
              >
                Desayunos
              </button>
              <button
                data-filter=".filter-salads"
                className={categoria === '641f6a5de60485c0d8ddd431' ? 'btn btn-success m-3' : 'btn btn-primary m-3'}
                onClick={handleComidas}
              >
                Comidas
              </button>
              <button
                data-filter=".filter-specialty"
                className={categoria === '641f6a6be60485c0d8ddd435' ? 'btn btn-success m-3' : 'btn btn-primary m-3'}
                onClick={handleBebidas}
              >
                Bebidas
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="containerPlatillos">
        {productos
        .filter((art) => categoria === '' || art.categorie._id === categoria)
        .map((art) => {
          return (
            <div className="cardPlatillos" key={art._id}>
              <img
                src={art.image.secure_url}
                alt=""
                className="imgPlatillos"
              />
              <h6 className="text-uppercase" >{art.name}</h6>
              <p className="pPlatillos">{art.description.slice(0, 170)}...</p>
              <a
                className="aPlatillos"
                onClick={() => handleClick(art._id)}
              >
                Ver más...
              </a>
            </div>
          );
        })}
      </div>
      <br /> <br />
      <Footer />
    </div>
  )
}

export default MenuProd

