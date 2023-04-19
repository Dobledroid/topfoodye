import React, { useState, useEffect } from "react"; 
import Footer from '../../estructura/Footer'
import Header from '../../estructura/Header'
import './Bebidas.css'
import { useNavigate } from "react-router-dom";

const Bebidas = () => {
  const [bebidas, setBebidas] = useState([]);
  const navigate = useNavigate();

  async function response() {
    const response = await fetch("https://api-rest-luis-r45f.vercel.app/getproductscategorie/641f6a6be60485c0d8ddd435", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   categorie: "Bebidas"
      // }),
    });
    const data = await response.json();
    // console.log(data);
    setBebidas(data);
  }

  useEffect(() => {
    response();
  }, []);

  const handleClick = (_id) => {
    // navigate(`/producto/${_id}`);
    console.log("Click"+ _id)
    navigate('/bebida', { state: {_id: _id} } )
  };

  return (
    <div>
      <Header />
      <h1 className="titleBebidas">Bebidas</h1>
      <div className="containerBebidas">
      {bebidas.map((prod) => {
          return (
            <div className="cardBebidas">
              <img
                src={prod.image.secure_url}
                alt=""
                className="imgBebidas"
              />
              <h4 className="h4Bebidas">{prod.name}</h4>
              <p className="pBebidas">{prod.description.slice(0, 170)}...</p>
              <a
                className="aBebidas"
                onClick={() => handleClick(prod._id)}
              >
                Ver más...
              </a>
            </div>
          );
        })}
      </div>
      <br /> <br />
    <Footer />
    </div>
  )
}

export default Bebidas
