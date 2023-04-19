import React from 'react';
import '../assets/css/style.css'

function Contacto() {
  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Contacto</h2>
          <p>Contáctenos</p>
        </div>
      </div>

      <div data-aos="fade-up">
        <iframe title="map" style={{ border: 0, width: '100%', height: 350 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d688.0463367886917!2d-98.41195499922998!3d21.14186190630337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d727f7e344777d%3A0x5d9ce1e446663285!2sINE%20Huejutla!5e1!3m2!1ses!2smx!4v1679678360779!5m2!1ses!2smx" allowFullScreen></iframe>
      </div>

      <div className="container" data-aos="fade-up">

        <div className="row mt-5">

          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="icon-ubicacion"></i>
                <h4>Ubicación:</h4>
                <p>Blvd, Adolfo López Mateos s/n, Colonia Bugambilias, 43000 Huejutla, Hgo.</p>
              </div>

              <div className="open-hours">
                <i className="icon-clock"></i>
                <h4>Horarios de apertura:</h4>
                <p>
                  Lunes-Viernes:<br />
                  7:00 AM - 6:00 PM
                </p>
                <br/>
                <p>
                  Sadado-Domingo:<br />
                  9:00 AM - 4:00 PM
                </p>
              </div>

              <div className="email">
                <i className="icon-correo"></i>
                <h4>Correo electrónico:</h4>
                <p>topfoodye@gmail.com</p>
              </div>

              <div className="phone">
                <i className="icon-telephone"></i>
                <h4>Llamar:</h4>
                <p>+52 7713169435</p>
              </div>

            </div>

          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Su nombre" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Tu correo electrónico" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Sujeto" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="8" placeholder="Mensaje" required />
              </div>
              <div className="my-3">
                <div className="loading">Cargando....</div>
                <div className="error-message"></div>
                <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
              </div>
              <div className="text-center"><button type="submit">Enviar mensaje</button></div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contacto;




