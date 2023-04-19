import React, { useState } from 'react';
import Img1 from './img/1.1.png';
import Img2 from './img/1.2.png';
import Img3 from './img/1.3.png';

const Carrusel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="false">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className={index === 0 ? 'active' : ''}></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1" className={index === 1 ? 'active' : ''}></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2" className={index === 2 ? 'active' : ''}></li>
      </ol>
      <div className="carousel-inner" data-interval="2000" autoplay>
        <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
          <img className="d-block w-100" src={Img1} alt="First slide" />
        </div>
        <div className={`carousel-item ${index === 1 ? 'active' : ''}`}>
          <img className="d-block w-100" src={Img2} alt="Second slide" />
        </div>
        <div className={`carousel-item ${index === 2 ? 'active' : ''}`}>
          <img className="d-block w-100" src={Img3} alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={() => handleSelect(index === 0 ? 2 : index - 1)}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={() => handleSelect(index === 2 ? 0 : index + 1)}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carrusel;
