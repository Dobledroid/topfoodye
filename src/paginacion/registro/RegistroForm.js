import React, {useState} from "react";
import IconUsuario from "./assets/username-icon.svg";
import IconPassword from "./assets/password-icon.svg";
import IconCorreo from "./assets/socialemailcircularbutton_80177.svg";
import IconYuno from "./assets/8Lez.gif";
import IconGoogle from "./assets/google-icon.svg";
import IconFacebook from "./assets/facebook-svgrepo-com.svg";

import Header from "../../estructura/Header";
import Footer from "../../estructura/Footer";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegistroForm = () => {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState("");
  // const [handleBoleano, setHandleBoleano] = useState(false);

  const navigate = useNavigate();

  const handleNavegarLogin=()=>{
    navigate('/login');
  }

  const validaciones=()=>{
    const mayusculas = /[A-Z]/;
    const minusculas = /[a-z]/;
    const numeros = /\d/;
    const caracteres = /[!@#$%^&*()\-_=+{};:,<.>]/;

    const errors = [];

    if (!mayusculas.test(password)) {
      errors.push("La contraseña debe tener al menos una letra mayúscula.");
    }

    if (!minusculas.test(password)) {
      errors.push("La contraseña debe tener al menos una letra minúscula.");
    }

    if (!numeros.test(password)) {
      errors.push("La contraseña debe tener al menos un número.");
    }

    if (!caracteres.test(password)) {
      errors.push("La contraseña debe tener al menos un carácter especial.");
    }

    if (password != password2) {
      errors.push("Las contraseñas no coinciden.");
    }

    if (errors.length > 0) {
      const errorMessage = errors.join(" ");

      // setPasswordError(errors.join(" "));
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Cerrar",
      });

      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }

  const handleRegistrar= async (cont)=>{
    cont.preventDefault();
    let errorMessage = '';
    let handleBoleano = false;
    if (validaciones()) {
      const respuesta = await fetch ("https://api-rest-proyecto.onrender.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nombre, 
            email: correo, 
            password: password
          })
        }
      );

      const data = await respuesta.json();
      // console.log(data);

      if(data.message=='El nombre de Usuario y Correo ya estan en uso'){
        errorMessage = ("Usuario y Correo en uso");
      }else if(data.message=='El correo ya esta en uso'){
        errorMessage = ("El correo ya esta en uso");
      }else if(data.message=='El usuario ya esta en uso'){
        errorMessage = ("Usuario en uso");
      }else{
        handleBoleano=true;
      }

      Swal.fire({
        title: handleBoleano ? "Registrado con exito" : "Error en el registro",
        text: handleBoleano ? "Bienvenido " + nombre : errorMessage,
        icon: handleBoleano ? "success" : "error",
        confirmButtonText: "Cerrar",
      });

      if(handleBoleano){
        navigate('/login');
      }
    }

  }
  

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: "100px" }}>
        <div className="p-5 rounded-5 text-secondary shadow" style={{ width: "25rem", marginTop: '170px', backgroundColor: '#661141' }}>
          <div className="d-flex justify-content-center">
            <img src={IconYuno} alt="login-icon" style={{ height: '7rem', pointerEvents: 'none', borderRadius: '50px' }} />
          </div>
          <div className="text-center fs-1 fw-bold">Registro</div>
          <form onSubmit={handleRegistrar}>
            <div className="form-group mt-4">
              <label htmlFor="username">Nombre:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconUsuario}
                  alt="username-icon"
                  style={{ height: '1rem', pointerEvents: 'none' }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="text"
                name="usuario"
                id="usuario"
                placeholder="Ingrese tu nombre"
                required 
                maxLength="28"
                minLength="3"
                onChange={ (cont) => setNombre(cont.target.value) }
                value={nombre}
              />
            </div>
            <div className="form-group mt-1">
              <label htmlFor="password">Correo eletronico:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconCorreo}
                  alt="password-icon"
                  style={{ height: '1rem', pointerEvents: 'none', color: 'white'}}
                />
              </div>
              <input
                className="form-control bg-light"
                type="email"
                placeholder="Ingresa tu correo eletronico"
                id="email"
                name="email"
                required maxLength="28"
                onChange={ (cont) => setCorreo(cont.target.value) }
                value={correo}
              />
            </div>
            <div className="form-group mt-1">
              <label htmlFor="password">Contraseña:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconPassword}
                  alt="password-icon"
                  style={{ height: '1rem', pointerEvents: 'none' }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="password"
                name="pass"
                id="pass"
                placeholder="Ingrese su contraseña"
                required maxLength="28" minLength="8"
                onChange={ (cont) => setPassword(cont.target.value) }
                value={password}
              />
            </div>

            <div className="form-group mt-1">
              <label htmlFor="password">Repite la contraseña:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconPassword}
                  alt="password-icon"
                  style={{ height: '1rem', pointerEvents: 'none' }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="password"
                name="pass"
                id="pass"
                placeholder="Confirmse su contraseña"
                required maxLength="28" minLength="8"
                onChange={ (cont) => setPassword2(cont.target.value) }
                value={password2}
              />
            </div>
            <button type="submit" className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
              Ingresar
            </button>
          </form>
          <div className="d-flex gap-1 justify-content-center mt-3">
            <div>¿Ya tienes una cuenta?</div>
            <a className="text-decoration-none text-info fw-semibold" onClick={handleNavegarLogin}>
            Inicia sesión
            </a>
          </div>
          <div className="p-3">
            <div className="border-bottom text-center" style={{ height: '0.9rem' }}>
              {/* <span className="bg-white px-3">or</span> */}
            </div>
          </div>
          <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm">
            <img
              src={IconGoogle}
              alt="google-icon"
              style={{ height: '1.6rem', pointerEvents: 'none' }}
            />
            <div className="fw-semibold text-secondary">Continuar con Google</div>
          </div>
          <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm">
            <img
              src={IconFacebook}
              alt="google-icon"
              style={{ height: '1.6rem', pointerEvents: 'none' }}
            />
            <div className="fw-semibold text-secondary">Continuar con Facebook</div>
          </div>

        </div>
      </div>
      <Footer />
    </div>

  );
}
export default RegistroForm;
