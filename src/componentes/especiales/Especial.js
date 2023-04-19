import React from 'react'
import Especial1 from '../assets/img/specials-1.png';
import Especial2 from '../assets/img/specials-2.png';
import Especial3 from '../assets/img/specials-3.png';
import Especial4 from '../assets/img/specials-4.png';
import Especial5 from '../assets/img/specials-5.png';

const Especial = () => {
  return (
    <div className='' style={{backgroundColor: "#D5BFBF"}}>
      <section id="specials" className="specials">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Especiales</h2>
            <p>Consulta Nuestras Especiales</p>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-3">
              <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                  <a className="nav-link active show" data-bs-toggle="tab" href="#tab-1">Modi sit est</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-2">Unde praesentium sed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-3">Pariatur explicabo vel</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-4">Nostrum qui quasi</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-5">Iusto ut expedita aut</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="tab-content">
                <div className="tab-pane active show" id="tab-1">
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Architecto ut aperiam autem id</h3>
                      <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                      <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero</p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src={Especial1} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-2">
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Et blanditiis nemo veritatis excepturi</h3>
                      <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                      <p>Ea ipsum voluptatem consequatur quis est. Illum error ullam omnis quia et reiciendis sunt sunt est. Non aliquid repellendus itaque accusamus eius et velit ipsa voluptates. Optio nesciendum nihil sit enim. Occaecati exercitationem voluptatum in temporibus rerum. Est aperiam et porro quasi repellat voluptas.</p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src={Especial2} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-3">
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Impedit facilis occaecati odio neque aperiam sit</h3>
                      <p className="fst-italic">Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt dicta dolor et.</p>
                      <p>Ipsum quis sunt. Veritatis unde neque eligendi. Quia aspernatur consequatur exercitationem non. Autem mollitia earum et officia. </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src={Especial3} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-4">
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Fuga dolores inventore laboriosam ut est accusamus laboriosam dolore</h3>
                      <p className="fst-italic">Dignissimos quo nobis ea ratione velit et porro omnis nostrum eius. Sunt veritatis ut voluptatum ipsam voluptatem natus. Sint qui est ea occaecati.</p>
                      <p>Quas fugiat ut perspiciatis vero provident. Ad eos voluptatem aliquam odit ut velit. Nihil accusantium quae quaerat sint. Ducimus voluptatum quaerat nam sunt odit fugit. </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src={Especial4} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-5">
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Est eveniet ipsam sindera pad rone matrelat sando reda</h3>
                      <p className="fst-italic">Omnis blanditiis saepe eos autem qui sunt debitis porro quia.</p>
                      <p>Exercitationem nostrum omnis. Ut reiciendis repellendus voluptatem eius distinctio. Esse nihil dolor iure. Autem blanditiis cumque vero laboriosam porro. Nisi doloremque id id quia aut est. Autem ut explicabo.</p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src={Especial5} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Especial;



