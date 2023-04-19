import React, { useState, useEffect } from "react";
import Footer from "../../estructura/Footer";
import Header from "../../estructura/Header";
import { useLocation, useNavigate } from 'react-router-dom';

const IdBebidas = () => {
  const [bebidas, setBebidas] = useState([]);
  const [urlImage, setUrlImage] = useState('https://via.placeholder.com/200')
  const [cantidad, setCantidad] = useState(0);

  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const st = location.state;

  const [id, setId] = useState(st._id);

  //MANEJO DE USUARIO
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      setIsLoggedIn(loggedIn);
    }
  });

  const handleLogin = () => {
    navigate('/login');
  }

  const handleVolver = () => {
    navigate('/bebidas');
  }

  const handleRealizar = async (cant) => {
    cant.preventDefault();
    if (cantidad <= bebidas.stock && cantidad > 0) {

      const datos = {
        userId: user.id,
        producto: bebidas._id,
        cantidad: cantidad,
        total: precio * cantidad,
        newStock: stock - cantidad
      }

      navigate('/datosenvio', { state: { datos: datos } });
    } else {
      alert("Cantidad  no posible, revise el stock");
    }
  }

  async function response() {
    const response = await fetch(`https://api-rest-luis-r45f.vercel.app/products/${id}`)
    const data = await response.json();
    setUrlImage(data.image.secure_url)
    // console.log(data);
    setBebidas(data);
    setPrecio(data.price);
    setStock(data.stock);
  }

  useEffect(() => {
    response();
  }, []);

  return (
    <div>
      {/* <h2>{id}</h2> */}
      <Header />
      <h1 className="titlePlatillos">Bebidas</h1>
      <div className="containerPlatillos">
        <div className="cardPlatillos">
          <img
            src={urlImage}
            className="imgPlatillos"
          />
          <h4 className="h4Platillos">{bebidas.name}</h4>
          <p className="pPlatillos">{bebidas.description}</p>
          <h6>Precio: {bebidas.price}</h6>
          <h6>Existencias: {bebidas.stock}</h6>
          {isLoggedIn ? (
            <form onSubmit={handleRealizar}>
              <div className="form-group mt-1">
                <label htmlFor="password">Ingresa la cantidad a comprar:</label>
              </div>
              <div className="input-group mt-1">
                <input
                  className="form-control bg-light"
                  type="number"
                  placeholder="Ingresa la cantidad a comprar"
                  required
                  value={cantidad}
                  onChange={(cant) => setCantidad(cant.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
                Realizar pedido
              </button>
            </form>
          ) : (
            <>
              <button type="submit" className="btn btn-info text-white w-100 mt-4 mb-4 fw-semibold shadow-sm" onClick={handleLogin}>
                Inicia sesión para realizar un pedido
              </button>
            </>
          )}

          <button type="submit" className="btn btn-warning text-white w-100 mt-4 mb-4 fw-semibold shadow-sm" onClick={handleVolver}>
            Regresar
          </button>
        </div>
      </div>
      <br /> <br />
      <Footer />
    </div>
  );
};
export default IdBebidas