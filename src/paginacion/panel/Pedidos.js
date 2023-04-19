import React, { useState, useContext, useEffect } from 'react';
import './Panel.css'
import Header from "../../estructura/Header";
import Footer from "../../estructura/Footer";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

import useInterval from "use-interval";

const Pedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [idUser, setId] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      setIsLoggedIn(loggedIn);
      setId(user.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);

    // Eliminar la sesión del almacenamiento local
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    navigate('/login');
  };

  const obtenerDatos = async () => {
    try {
      const response = await fetch(
        `https://api-rest-luis-r45f.vercel.app/ventasUser/${idUser}`
      );
      const data = await response.json();
      setPedidos(data);
      // console.log("ACT")
    } catch (error) {
      console.log("Ha ocurrido un error al recuperar los datos: ", error);
    }
  };

  useInterval(obtenerDatos, 5000);


  return (
    <div className='todoPanel'>
      <Header />
      <div style={{ marginTop: "96px" }}>
        <div className="containerPanel" >
          <div className="sidebarPanel">
            <div className="profilePanel">
              <img src="https://via.placeholder.com/150" alt="Profile Picture" className="profile-picturePanel" />
              <h3>{user.usuario}</h3>
            </div>
            <nav className='navPanel'>
              <ul className='ulPanel'>
                <li className='liPanel'><Link to={"/"} className='aPanel'>Inicio</Link></li>
                <li className='liPanel'><Link to={"/panel"} className='aPanel'>Ver perfil</Link></li>
                {/* <li className='liPanel'><Link to={"/"} className='aPanel'>Configuración</Link></li> */}
                {isLoggedIn ? (
                  <li className='liPanel'><button onClick={handleLogout} className='btn btn-warning'>Cerrar Sesión</button></li>
                ) : (
                  <li className='liPanel'><Link to={"/login"} className='aPanel'>Iniciar Sesión</Link></li>
                )}
              </ul>
            </nav>
          </div>
          <div className="main-contentPanel">
            <h1 className='h1Panel'>Historial de pedidos</h1>
            {/* <p>{user}</p> */}
            {/* <p>Usuario identificado: {user.usuario}</p> */}
            {/* <p>ID: {user.id}</p>
            <p>CORREO: {user.correo}</p>
            <p>TIPO: {user.tipo}</p> */}
            <section>
              <div>
                <div>
                  <div className="table-responsive">
                    <table className="table table-dark table-striped">
                      <thead>
                        <tr>
                          {/* <th>Fecha</th> */}
                          <th>Producto</th>
                          {/* <th>Total</th> */}
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidos.map((art) => (
                          <tr key={art._id} >
                            {/* <td>{ art.date}</td> */}
                            <td>{art.products.product.name}</td>
                            {/* <td>{art.totalPrice}</td> */}
                            <td>{art.products.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Pedidos
