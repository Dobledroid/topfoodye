import React from 'react'
import { useLocation } from 'react-router-dom';


const Perfil = ({ user }) => {
  // const location = useLocation();
  // const user = location.state?.user;
  // const user = props.user;
  console.log(user)
  
  return (
    <div>
      <h1>Perfil de usuario</h1>
      <p>Nombre: {user}</p>
      <p>Correo: {user}</p>
    </div>
  )
}

export default Perfil
