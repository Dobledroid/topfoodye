import React from "react";
import "./Error404.css";
// import logo from "../../imagenes/kobayashi-san.gif";
import logo from "../../imagenes/404.png";
// import 'bootstrap/dist/css/bootstrap.min.css'

import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  const handleInicio = () => {
    navigate('/');
  }

  return (
    <section className="page-404">
      <div className="container" >
        <div className="row">
          <div className="col-md-12">
            <a href="">
              <img src={logo} alt="site logo" width="170px" onClick={handleInicio} />
            </a>
            <h1>404</h1>
            <h2>La página que buscaba no existe</h2>
            <a className="btn btn-main" onClick={handleInicio}>
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;
