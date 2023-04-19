import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import { Routes, Route } from 'react-router-dom';
import Index from './Index';

import Header from '../estructura/Header';
import Footer from '../estructura/Footer';
import Platillos from './platillos/Platillos';
import Bebidas from './bebidas/Bebidas';
// import Conexion from '../conexion/Conexion';
// import Copia from './Copia';
import informacion from './Informacion/Informacion';
import Terminos from './terminos/Terminos';
import Politicas from './politicas/Politicas';
import Panel from './panel/Panel';
import Perfil from './panel/Perfil';
import CrudProductos from '../adm/productos/CrudProductos';

import Usuarios from '../adm/usuarios/Usuarios';
import CheckCorreo from '../recovery/CheckCorreo';
import CheckCode from '../recovery/CheckCode';
import CheckPass from '../recovery/CheckPass';
import VerPlatillo from './platillos/VerPlatillo';
import Admin from '../adm/Admin';
import VerBebida from './bebidas/VerBebida';
import LoginForm from './login/LoginForm';
import RegistroForm from './registro/RegistroForm';
import Carrusel from '../componentes/slider2/Carrusel';
import Only from '../componentes/slider2/CarouselSlidesOnly';
import CarouselIndicators from '../componentes/slider2/CarouselIndicators';
import TypeUser from '../adm/tipouser/TypeUser';
import Error404 from './Error404/Error404';
import DatosEnvio from './platillos/DatosEnvio';
import BackupDB from '../adm/backup/db/BackupDB';
import IoT from './iot/IoT';
import Menu from '../componentes/menu/Menu';
import Login from '../compahechosi/Login';
import Pedidos from './panel/Pedidos';
import Buscador from './buscador/Buscador';
import Navbar from './buscador/Navbar';
import MenuProd from './menuProd/MenuProd';
import CarouselSlidesOnly from '../componentes/slider2/CarouselSlidesOnly';


const Rutas = () => {
  return (
    <div>
       <Routes>
        <Route path='/'  Component={ Index} />
          <Route path='/header' Component={ Header }></Route>
          <Route path='/footer' Component={ Footer  }></Route>
          <Route path='/platillos' Component={ Platillos } />
          <Route path='/bebidas' Component={ Bebidas } />
          <Route path='/registro' Component={ RegistroForm }></Route>
          <Route path='/login' Component={ LoginForm }></Route>
          <Route path='/informacion' Component={ informacion } /> 
          <Route path='/terminos' Component={ Terminos }></Route>
          <Route path='/politicas' Component={ Politicas }></Route>
          {/* <Route path='/help' Component={ Copia }></Route> */}

          {/* <Route path='/conexion' Component={ Conexion  }></Route> */}
          {/* <Route path='/copia' Component={ Copia }></Route> */}
          <Route path='/panel' Component={ Panel }></Route>
          <Route path='/perfil' Component={ Perfil }></Route>
          <Route path='/crudProductos' Component={ CrudProductos }></Route>
          <Route path='/usuarios' Component={ Usuarios }></Route>
          <Route path='/checkcorreo' Component={ CheckCorreo }></Route>
          <Route path='/checkcode' Component={ CheckCode }></Route>
          <Route path='/checkpass' Component={ CheckPass }></Route>
          <Route path='/producto' Component={ VerPlatillo }></Route>
          <Route path='/bebida' Component={ VerBebida }></Route>
          <Route path='/admin' Component={ Admin }></Route>
          <Route path='/carrusel' Component={ CarouselIndicators }></Route>
          <Route path='/carrusel2' Component={ CarouselSlidesOnly }></Route>
          <Route path='/typeuser' Component={ TypeUser }></Route>
          <Route path='/datosenvio' Component={ DatosEnvio }></Route>
          <Route path='/backupdb' Component={ BackupDB }></Route>
          <Route path='/iot' Component={ IoT }></Route>
          {/* <Route path='/menu' Component={ Menu }></Route> */}
          <Route path='/pedidos' Component={ Pedidos }></Route>
          <Route path='/buscador' Component={ Buscador }></Route>
          <Route path='/navbar' Component={ Navbar }></Route>
          <Route path='/menu' Component={ MenuProd }></Route>

          <Route path='*' Component={ Error404 }></Route>
          
      </Routes>
    </div>
  )
}

export default Rutas
