import React from 'react'
import './Panel.css'
import Header from "../estructura/Header";
import Footer from "../estructura/Footer";
//NAVEGACION
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'


const Admin = () => {
  const location = useLocation();
  const user = location.state;
  const navegacion = useNavigate();

  return (
    <div className='todoPanel'>
      <Header />
      <div className="containerPanel">
        <div className="sidebarPanel">
          <div className="profilePanel">
            <img src="https://via.placeholder.com/150" alt="Profile Picture" className="profile-picturePanel" />
              <h3>{ user.usuario }</h3>
          </div>
          <nav className='navPanel'>
            <ul className='ulPanel'>
              <li className='liPanel'><Link to={"/"} className='aPanel'>Inicio</Link></li>
              <li className='liPanel'><Link to={"/"} className='aPanel'>Perfil</Link></li>
              {/* <li className='liPanel'>
                <Link to={{
                  pathname: "/perfil",
                  state: { user: user2 } 
                }} className='aPanel'>Perfil</Link>
              </li> */}
              {/* <Link to="/perfil">
                Ver perfil
              </Link>
              <Perfil user={user2} /> */}

              {/* <li className='liPanel'> */}
                {/* <Perfil user={user2} /> Pasar los datos como props */}
              {/* </li> */}
              <li className='liPanel'><Link to={"/"} className='aPanel'>Configuración</Link></li>
              <li className='liPanel'><Link to={"/"} className='aPanel'>Cerrar Sesión</Link></li>
            </ul>
          </nav>
        </div>
        <div className="main-contentPanel">
          <h1 className='h1Panel'>Bienvenido a tu Panel de Aminitrador</h1>
          <p className='pPanel'>Desde aquí puedes acceder a todas las opciones disponibles para tu cuenta.</p>
          <section>
            <div>
              <ul className='ulPanel'>
                <li className='liPanel'><Link to={"/usuarios"} className='aPanel'>Gestionar USUARIOS</Link></li>
                <li className='liPanel'><Link to={"/crudProductos"} className='aPanel'>Gestionar PRODUCTOS</Link></li>
                {/* <li className='liPanel'><Link to={"/crudProductos"} className='aPanel'>Crud de DATOS USUARIOS</Link></li> */}
                <li className='liPanel'><Link to={"/backupdb"} className='aPanel'>REALIZAR BACKUP BD</Link></li>
                {/* <li className='liPanel'><Link to={"/backupColeccion"} className='aPanel'>REALIZAR BACKUP COLECCION</Link></li> */}
                {/* <li className='liPanel'><Link to={"/backupColeccion"} className='aPanel'>PROGRAMAR BACKUP</Link></li> */}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Admin
