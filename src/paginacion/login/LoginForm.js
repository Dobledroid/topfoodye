import React, { useState, useEffect } from "react";
import IconYuno from "./assets/8Lez.gif";
import IconUsuario from "./assets/username-icon.svg";
import IconPassword from "./assets/password-icon.svg";
import IconGoogle from "./assets/google-icon.svg";
import IconFacebook from "./assets/facebook-svgrepo-com.svg";
import Header from "../../estructura/Header";
import Footer from "../../estructura/Footer";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import './app/googleLogin'
//----------
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
// import { FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

import { auth } from "./firebase.js";


function LoginForm() {

  const handleGoogle = async (event) => {
    const provider = new GoogleAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      // console.log(credentials.user)
      const data = credentials.user;
      // console.log(data)
      const user = { usuario: data.displayName, correo: data.email, id: data._id, tipo: data.typeUser, foto: data.photoURL };
      // console.log(user)
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/panel', { state: user })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFacebook = async (event) => {
    const provider = new FacebookAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      // console.log(credentials.user)
      const data = credentials.user;
      console.log(data)
      const user = { usuario: data.displayName, correo: data.email, id: data._id, tipo: data.typeUser, foto: data.photoURL };
      // console.log(user)
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/panel', { state: user })
    } catch (error) {
      console.log(error)
    }
  }


  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleRegistroClick() {
    navigate('/registro');
  }

  function handleIngresoClick() {
    navigate('/checkcorreo');
  }

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('isLoggedIn');
  //   if (loggedIn === 'true') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("https://api-rest-luis-r45f.vercel.app/valUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: correo,
        password: password,
      }),
    });

    const data = await response.json();

    if (data.message == "Correo o contraseña incorrectos") {
      Swal.fire({
        title: "Error",
        text: "Correo o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } else {
      // console.log(data)
      const user = { usuario: data.name, correo: data.email, id: data._id, tipo: data.typeUser, foto: '' };
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/panel', { state: user })
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: "100px" }}>
        <div className="p-5 rounded-5 text-secondary shadow" style={{ width: "25rem", marginTop: '170px', backgroundColor: '#661141' }}>
          <div className="d-flex justify-content-center">
            <img src={IconYuno} alt="login-icon" style={{ height: '7rem', pointerEvents: 'none', borderRadius: '70px' }} />
          </div>
          <div className="text-center fs-1 fw-bold">Inicia sesión</div>
          <form onSubmit={handleLogin}>
            <div className="form-group mt-4">
              <label htmlFor="username">Correo electrónico:</label>
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
                type="email"
                placeholder="Ingresa su correo"
                name="email"
                required maxLength="28"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
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
                placeholder="Ingrese su contraseña"
                name="password"
                required maxLength="28"
                // minLength="8"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
              Ingresar
            </button>
          </form>
          <div className="d-flex gap-1 justify-content-center mt-3">
            <div>¿No tienes una cuenta?</div>
            <a className="text-decoration-none text-info fw-semibold" onClick={() => { handleRegistroClick() }}>
              Regístrate aquí
            </a>
          </div>
          <div className="d-flex gap-1 justify-content-center mt-1">
            <div>¿Olvidaste tu contraseña?</div>
            <a className="text-decoration-none text-info fw-semibold" onClick={() => { handleIngresoClick() }}>
              Ingresa aquí
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
              id="googleLogin"
              style={{ height: '1.6rem', pointerEvents: 'none' }}
            />
            {/* <div className="fw-semibold text-secondary">Continuar con Google</div> */}
            <button className="fw-semibold text-secondary"
              style={{
                border: '#661141',
                backgroundColor: '#661141'
              }}
              onClick={() => { handleGoogle() }}
            >Continuar con Google</button>

          </div>
          <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm">
            <img
              src={IconFacebook}
              alt="google-icon"
              id="facebookLogin"
              style={{ height: '1.6rem', pointerEvents: 'none' }}
            />
            {/* <div className="fw-semibold text-secondary">Continuar con Facebook</div> */}
            <button className="fw-semibold text-secondary"
              style={{
                border: '#661141',
                backgroundColor: '#661141'
              }}
              onClick={() => { handleFacebook() }}
            >Continuar con Facebook</button>
          </div>

        </div>
      </div>
      <Footer />
    </div>

  );
}
export default LoginForm;