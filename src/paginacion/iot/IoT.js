import React from 'react';
import Footer from '../../estructura/Footer';
import Header from '../../estructura/Header';

const IoT = () => {
  return (
    <div>
      <Header />
      <iframe
        src="https://topfoodye.equipotrabajo3d.com/AppIoT/controlPecera.html"
        title="example-website"
        height="1000"
        width="100%"
      />
      <Footer/>
    </div>
  );
};

export default IoT;
