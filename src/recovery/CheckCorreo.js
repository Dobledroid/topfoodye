import React, { useState, useEffect } from "react";
import IconYuno from "./assets/8Lez.gif";
import IconUsuario from "./assets/username-icon.svg";
import IconGoogle from "./assets/google-icon.svg";
import IconFacebook from "./assets/facebook-svgrepo-com.svg";
import Header from "../estructura/Header";
import Footer from "../estructura/Footer";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CheckCorreo = () => {
  const [correo, setCorreo] = useState("");

  const navigate = useNavigate();

  function handleRegistroClick() {
    navigate("/registro");
  }

  function handleIngresoClick() {
    navigate("/login");
  }

  const codigo = ({ id, code }) => {
    navigate("/checkcode", { state: { id, code } });
  };

  const handleCorreo = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "https://api-rest-luis-r45f.vercel.app/recuPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: correo,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (
      data.message === "El correo electrónico proporcionado no está registrado"
    ) {
      console.log("El correo electrónico proporcionado no está registrado");
      Swal.fire({
        title: "Error",
        text: "El correo electrónico proporcionado no está registrado",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } else {
      const response2 = await fetch(
        "https://api-rest-luis-r45f.vercel.app/usersEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: correo,
          }),
        }
      );

      const data2 = await response2.json();
      codigo({ id: data2._id, code: data2.resetToken });
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
          <div className="text-center fs-1 fw-bold">Restablecer contraseña</div>
          <form onSubmit={handleCorreo}>
            <div className="form-group mt-4">
              <label htmlFor="username">Ingresa tu correo abajo para restablecer la contraseña:</label>
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
                name="correo"
                id="correo"
                placeholder="Ingrese su correo electrónico"
                required 
                minLength="3"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
              Ingresar
            </button>
          </form>
          <div className="d-flex gap-1 justify-content-center mt-1">
            <div>¿No tienes una cuenta?</div>
            <a className="text-decoration-none text-info fw-semibold" onClick={() => { handleRegistroClick() }}>
              Regístrate aquí
            </a>
          </div>
          <div className="d-flex gap-1 justify-content-center mt-1">
            <div>¿Ya tienes una cuenta?</div>
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
export default CheckCorreo;