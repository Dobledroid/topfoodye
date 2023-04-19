import React from "react";
import Footer from "../../estructura/Footer";
import Header from "../../estructura/Header";
import LetraLogo from "../../imagenes/letras.png";
import './Informacion.css'

const Informacion = () => {
  return (
    <div>
      <Header />
      <div className="divInf">
      <h2 className="tituloInf">Mision</h2>
      <div className="containerInf">
        <div className="textoInf">
          <div className="centerInf">
            <p className="pInf">
              Trabajar día a día en proveer salud y bienestar a los consumidores, a través de platos y bebidas ricos en nutrientes y con cantidades adecuadas de calorías, preparados con insumos de calidad para que los clientes conozcan los beneficios de una alimentación sana.
            </p>
          </div>
        </div>
      </div>
      <br />
      <h2 className="tituloInf">Vision</h2>
      <div className="containerInf">
        <div className="textoInf">
          <div className="centerInf">
            <p className="pInf">
              Ser una empresa reconocida como una de las mejor productora de alimentos y ser el referente local de los mejores en cuanto a calidad y nivel de servicio de comida saludable.
            </p>
          </div>
        </div>
      </div>
      <br />
      <h2 className="tituloInf">¿Quienes somos?</h2>
      <div className="containerInf">
        <div className="textoInf">
          <div className="centerInf">
            <p className="Inf">
              Somos una empresa mexicana originaria del municipio de Huejutla higalgo comprometida con brindar alimentos sanos y nutritivos para el consumidor local de Huejutla. La mayoria de la poblacion huejutlense suele consumir alimentos no balaneados, es decir, alimentos que no aportan nada bueno a la salud del consumidor.
            </p>
            <p className="pInf">
              Nuestro negocio tiene un giro empresarial de tipo industrial, por el momento solo somos un grupo de 4 integrantes estudiantes de la universidad tecnologica de la huasteca hidalguense UTHH la idea surge con la intencion de ayudar a mejorar la calidad de vida de los consumidores, aportando todos los beneficios de una comida sana.
            </p>
            <p className="pInf">
              Los nutrientes esenciales para que una comida sea saludable es que cuente con proteina, hidratos de carbono, lipidos, vitaminas, minerales y agua
            </p>
          </div>
        </div>
      </div>
      <br />
      <div class="imgInf">
        <img src={LetraLogo} width="200px" alt="Descripción de la imagen" />
      </div>

      <br />
      <br />
      </div>
      <Footer />
    </div>
  );
};

export default Informacion;
