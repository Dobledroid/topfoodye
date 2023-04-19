import React from "react";
import logo from "../imagenes/logo.png";
import "./Footer.css";
import Facebbok from "./images/facebook.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <div className="foote">
    <footer className="pie-pagina">
      <div className="trupo-1">
        <div className="box-img">
          <img src={logo} alt="logo de la compañia" className="logoFooter" style={{pointerEvents: 'none'}}/>
        </div>
        <div className="box-menu">
          <h2 className="h2Fo">
            <Link to={"/informacion"} className="LinksF">Sobre nosotros</Link>
          </h2>
          <p className="pFo">
            Somos una empresa mexicana originaria del municipio de Huejutla
          </p>
          <h2 className="h2Fo">
            <Link to={"/terminos"} className="LinksF">Terminos y condiciones</Link>
          </h2>
          <p className="pFo">
            Este sitio web es operado por TopFoodye con nombre comercial
            TopFoodye. En todo el sitio, los términos “nosotros”, “nos” y
            “nuestro” se refieren a TopFoodye{" "}
          </p>
          <h2 className="h2Fo">
            <Link to={"/politicas"} className="LinksF">Politicas de privacidad</Link>
          </h2>
          <p className="pFo">
            TopFoddye mejor conocido como TopFoddye, con domicilio en Huejutla,
            Hgo. y portal de internet https://topfoodye.equipotrabajo3d.com/,
          </p>
          <h2 className="h2Fo">
            <Link to={"/help"} className="LinksF">Ayuda en privado</Link>
          </h2>
          <p className="pFo">
            la empresa TopFoddye respondera todas las preguntas en privado
          </p>
        </div>

        {/* <!-- FIN MODULOS --> */}

        {/* <!-- REDES SOCIALES --> */}
        <div className="container-redes">
          <h2 className="fs-5 text-center">Contáctenos en nuestras redes sociales</h2>
          {/* <!--  estos son los bonones y  iconos de las redes sociales --> */}
          <div className="red-social">
            <a
              href="https://www.facebook.com/TopFoddye"
              className="icon-facebook"
              id="aFo"
            ></a>
            <a
              href="https://www.facebook.com/TopFoddye"
              className="icon-telefono"
              id="aFo"
            ></a>
            <a
              href="https://goo.gl/maps/nBTYDtptEBYoXaW1A"
              className="icon-ubicacion"
              id="aFo"
            ></a>
            <a
              href="https://www.instagram.com/"
              className="icon-instagram"
              id="aFo"
            ></a>
            <a
              href="https://wa.me/7713169435"
              className="icon-search"
              id="aFo"
            ></a>
          </div>
        </div>
        {/* <!-- FIN REDES SOCIALES --> */}
      </div>
      {/* <!-- copyright --> */}
      <div className="grupo-2">
        <small>
          &copy;2022 <b>TopFoodye</b>-Todos los derechos reservados Equipo2_5C.
        </small>
      </div>
    </footer>
    // </div>
  );
};

export default Footer;
