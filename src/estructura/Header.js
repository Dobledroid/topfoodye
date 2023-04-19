import React, { useState, useContext, useEffect } from 'react';
// import { SessionContext } from '../paginacion/contexts/SessionContext';

import favicon from '../imagenes/favicon-256x256.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  // const { loggedIn, user, logout } = useContext(SessionContext);
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      setIsLoggedIn(loggedIn);
    }
  }, []);

  const handleInicio =()=>{
    navigate('/');
  }

  return (
    <header className='headerH'>
    {/* <!-- ///logo  tiene una clse logo . img --> */}
    <Link to={'/'} className="logoH"><i className="icon-"></i>TopFoodye</Link>
    <nav className="navbarH" id="navbarH">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtnH">
        <i className="menu-iconH"><img src={favicon} alt="" className='favicon' /></i>
      </label>
      <ul className='ulH'>
        {/* <a href="../conexion/Conexion.php">Platillos</a> */}
        <Link to={"/iot"} className="LinksH"  style={{ fontSize: 17, overflowX: 'hidden', scrollPaddingTop: '5.5rem', scrollBehavior: 'smooth',   }} >Ver IoT</Link>
        <Link to={"/menu"} className="LinksH"  style={{ fontSize: 17, overflowX: 'hidden', scrollPaddingTop: '5.5rem', scrollBehavior: 'smooth',   }} >Menu</Link>
        {/* <Link to={"/bebidas"} className="LinksH" style={{ fontSize: 17, overflowX: 'hidden', scrollPaddingTop: '5.5rem', scrollBehavior: 'smooth',}} >Bebidas</Link> */}
        <Link to={"/informacion"} className="LinksH" style={{fontSize: 17}}>¿Quienes somos?</Link>
        {isLoggedIn ? (
          <>
            <Link to={"/"} className="LinksH" style={{ fontSize: 17, overflowX: 'hidden', scrollPaddingTop: '5.5rem', scrollBehavior: 'smooth',}} >Inicio</Link>
            
              <Link to={"/panel"} className="LinksH" style={{fontSize: 17}}>Ver mi perfil</Link>
            {/* )} */}
            <span className="text-info bg-dark p-1 me-2" style={{
              color: 'red'
            }}>Bienvenido, {user.usuario.slice(0, 10)}...!</span>
          </>
        ) : (
          <>
            <Link to={"/registro"} className="LinksH" style={{ fontSize: 17, overflowX: 'hidden', scrollPaddingTop: '5.5rem', scrollBehavior: 'smooth',}} >Registro</Link>
            <Link to={"/login"} className="LinksH" style={{ fontSize: 17, overflowX: 'hidden', scrollPaddingTop: '5.5rem', scrollBehavior: 'smooth',}} >Iniciar sesión</Link>
            <Link to={"/"} className="LinksH" style={{ fontSize: 17, overflowX: 'hidden', scrollPaddingTop: '5.5rem', scrollBehavior: 'smooth',}} >Inicio</Link>
          </>
        )}
        
      </ul>
    </nav>
  </header>
  )
}

export default Header;