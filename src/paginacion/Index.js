import React, { useState, useEffect } from "react";
import Header from '../estructura/Header'
import Footer from '../estructura/Footer'
import Contacto from "../componentes/contacto/Contacto";
import Especial from "../componentes/especiales/Especial";
import Menu from "../componentes/menu/Menu";
import CarouselIndicators from "../componentes/slider2/CarouselIndicators";



const Index = () => {

  const [comidas, setComidas] = useState([]);

  async function response() {
    const response = await fetch("https://api-rest-luis-r45f.vercel.app/getProductsCategorie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({ correo, password })
      body: JSON.stringify({
        categorie: "Comidas"
      }),
    });
    const data = await response.json();
    // console.log(data);
    setComidas(data);
  }

  useEffect(() => {
    response();
  }, []);

  return (
    <div>
      <Header />
      <br /><br /><br /><br />
      <div className="mt-3 mb-4">
        <CarouselIndicators />
      </div>
      {/* <div>
        <h2 className="tituloInf">Especiales del día</h2>
        <div className="containerPlatillos">
          {comidas.slice(0, 3).map((art) => {
            return (
              <div className="cardPlatillos">
                <img
                  src={art.image.secure_url}
                  alt=""
                  className="imgPlatillos"
                />
                <h4 className="h4Platillos">{art.name}</h4>
                <p className="pPlatillos">{art.description.slice(0, 170)}...</p>
                <a className="aPlatillos">Ver más...</a>
              </div>
            );
          })}
        </div>
        <br /> <br />
      </div> */}
      <br/>
      <div>
        <Menu />
      </div>
      <div>
        {/* <Especial /> */}
      </div>
      <div>
        <Contacto />
      </div>
      <br /><br /><br /><br /><br /><br />
      <div>
      </div>
      <Footer />
    </div>
  )
}

export default Index

