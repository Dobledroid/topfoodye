import React, { useState, useEffect } from "react";
import IconYuno from "./assets/8Lez.gif";
import IconTime from "./assets/time-cronometer-svgrepo-com.svg";

import Header from "../estructura/Header";
import Footer from "../estructura/Footer";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';


const CheckCode = () => {


  const navigate = useNavigate();

  const location = useLocation();
  const code = location.state;

  const [id, setId] = useState(code.id);
  const [codigo, setCodigo] = useState("");

  const handleCodigo = async (event) => {
    event.preventDefault();

    if(codigo == ''){
      Swal.fire({
        title: "Error",
        text: "Debe ingresar un codigo",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }else {
      if(code.code == codigo){
        navigate("/checkpass", { state: { id } })
      }else{
        Swal.fire({
          title: "Error",
          text: "El codigo es incorrecto",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
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
    <div className="text-center fs-1 fw-bold">Codigo de Confirmacion</div>
    <form onSubmit={handleCodigo}>
      <div className="form-group mt-4">
        <label htmlFor="username">Ingresa el codigo que hemos enviado al correo proporcionado:</label>
      </div>
      <div className="input-group mt-1">
        <div className="input-group-text bg-info">
          <img
            src={IconTime}
            alt="username-icon"
            style={{ height: '1rem', pointerEvents: 'none' }}
          />
        </div>
        <input
          className="form-control bg-light"
          type="text"
          name="codigo"
          id="codigo"
          placeholder="Ingrese el codigo"
          required
          value={codigo}
          onChange={(event) => setCodigo(event.target.value)}
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

export default CheckCode