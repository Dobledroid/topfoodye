import React, { useState, useEffect, useContext } from "react";
import Footer from "../../estructura/Footer";
import Header from "../../estructura/Header";
import "./Platillos.css";

// import { SessionContext } from '../contexts/SessionContext';
import { useNavigate } from "react-router-dom";

const Platillos = () => {
  const [comidas, setComidas] = useState([]);
  const navigate = useNavigate();

  async function response() {
    const response = await fetch(
      "https://api-rest-luis-r45f.vercel.app/getproductscategorie/641f6a5de60485c0d8ddd431",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setComidas(data);
  }

  useEffect(() => {
    response();
  }, []);

  const handleClick = (_id) => {
    // navigate(`/producto/${_id}`);
    // console.log("Click"+ _id)
    navigate('/producto', { state: {_id: _id} } )
  };

  return (
    <div>
      <Header />
      <h1 className="titlePlatillos">Platillos</h1>
      {/* {isLoggedIn ? (
        <span>Usuario: {user.id}</span>
      ):(
        <>
        </>
      )} */}
      <div className="containerPlatillos">
        {comidas.map((art) => {
          return (
            <div className="cardPlatillos" key={art._id}>
              <img
                src={art.image.secure_url}
                alt=""
                className="imgPlatillos"
              />
              <h6 className="text-uppercase" >{art.name}</h6>
              <p className="pPlatillos">{art.description.slice(0, 170)}...</p>
              <a
                className="aPlatillos"
                onClick={() => handleClick(art._id)}
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
  );
};

export default Platillos;
