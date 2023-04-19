import React from 'react';
import Img1 from './img/1.1.png';
import Img2 from './img/1.2.png';
import Img3 from './img/1.3.png';

const CarouselSlidesOnly = () => {
  return (
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={Img1} alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Img2} alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Img3} alt="Third slide" />
        </div>
      </div>
    </div>
  );
};
export default CarouselSlidesOnly;
