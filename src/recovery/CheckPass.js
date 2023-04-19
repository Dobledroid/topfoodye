import React, { useState, useEffect } from "react";

import IconYuno from "./assets/8Lez.gif";
import IconPassword from "./assets/password-icon.svg";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Header from "../estructura/Header";
import Footer from "../estructura/Footer";
import Swal from 'sweetalert2';


const CheckPass = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const code = location.state;

  // const [id, setId] = useState(code.id);
  const id = code.id;

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState("");

  const validaciones = () => {
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

  const handlePass = async (event) => {
    event.preventDefault();


    if (validaciones()) {
      const respuesta = await fetch(`https://api-rest-luis-r45f.vercel.app/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password
        })
      });

      const data = await respuesta.json();
      console.log(data);

      Swal.fire({
        title: "Actualizado",
        text: "Recuperacion terminda",
        icon: "success",
        confirmButtonText: "Cerrar",
      });

      navigate("/login")
    };
  }

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: "100px" }}>
        <div className="p-5 rounded-5 text-secondary shadow" style={{ width: "25rem", marginTop: '170px', backgroundColor: '#661141' }}>
          <div className="d-flex justify-content-center">
            <img src={IconYuno} alt="login-icon" style={{ height: '7rem', pointerEvents: 'none', borderRadius: '70px' }} />
          </div>
          <div className="text-center fs-1 fw-bold">Restablece tu contraseña</div>
          <form onSubmit={handlePass}>
            <div className="form-group mt-4">
              <label htmlFor="username">Ingresa la nueva contraseña:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconPassword}
                  alt="username-icon"
                  style={{ height: '1rem', pointerEvents: 'none' }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese su contraseña"
                required maxLength="28" minLength="8"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="username">Confirma la nueva contraseña:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconPassword}
                  alt="username-icon"
                  style={{ height: '1rem', pointerEvents: 'none' }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="password"
                name="password"
                id="password"
                placeholder="Confirme su contraseña"
                required maxLength="28" minLength="8"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
              Ingresar
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </div>

  );
}

export default CheckPass;