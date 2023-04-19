import React, { useState, useContext, useEffect } from 'react';
import './Panel.css'
import Header from "../../estructura/Header";
import Footer from "../../estructura/Footer";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Panel = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      setIsLoggedIn(loggedIn);
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

  return (
    <div className='todoPanel'>
      <Header />
      <div style={{marginTop: "96px"}}>
      <div className="containerPanel" >
        <div className="sidebarPanel">
          <div className="profilePanel">
          {user.foto !== '' ? (
                <img src={user.foto} alt="Profile Picture" className="profile-picturePanel" />
              ) : (
                <img src="https://via.placeholder.com/150" alt="Profile Picture" className="profile-picturePanel" />
              )}
            
            <h3>{user.usuario}</h3>
          </div>
          <nav className='navPanel'>
            <ul className='ulPanel'>
              <li className='liPanel'><Link to={"/"} className='aPanel'>Inicio</Link></li>
              <li className='liPanel'><Link to={"/pedidos"} className='aPanel'>Ver pedidos</Link></li>
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
          <h1 className='h1Panel'>Bienvenido a tu Panel de Usuario</h1>
          {/* <p>{user}</p> */}
          {/* <p>USUARIO: {user.usuario}</p> */}
          {/* <p>ID: {user.id}</p> */}
          {/* <p>CORREO: {user.correo}</p> */}
          {/* <p>TIPO: {user.tipo}</p> */}
          <p className='pPanel'>Desde aquí puedes acceder a todas las opciones disponibles para tu cuenta.</p>
          <section>
            <div>
              <ul className='ulPanel'>
                {user.tipo == "641e8a6fbab69569415ada99" ? (
                  <>
                    <li className='liPanel'><Link to={"/usuarios"} className='aPanel'>Gestionar USUARIOS</Link></li>
                    <li className='liPanel'><Link to={"/crudProductos"} className='aPanel'>Gestionar PRODUCTOS</Link></li>
                    {/* <li className='liPanel'><Link to={"/crudProductos"} className='aPanel'>Crud de DATOS USUARIOS</Link></li> */}
                    <li className='liPanel'><Link to={"/backupdb"} className='aPanel'>REALIZAR BACKUP BD</Link></li>
                    {/* <li className='liPanel'><Link to={"/backupColeccion"} className='aPanel'>REALIZAR BACKUP COLECCION</Link></li> */}
                    {/* <li className='liPanel'><Link to={"/backupColeccion"} className='aPanel'>PROGRAMAR BACKUP</Link></li> */}
                  </>
                ) : (
                  <>

                  </>
                )}  
              </ul>
            </div>
          </section>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Panel
