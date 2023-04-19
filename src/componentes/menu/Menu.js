import React, { useState, useEffect, useContext } from 'react';

const Menu = () => {
  const [articulos, setArticulos] = useState([]);
  const [categoria, setCategoria] = useState('');

  const handleTodos = () => {
    setCategoria('');
  };

  const handleDesayuno = () => {
    setCategoria('641f6a66e60485c0d8ddd433');
  };

  const handleComidas = () => {
    setCategoria('641f6a5de60485c0d8ddd431');
  };

  const handleBebidas = () => {
    setCategoria('641f6a6be60485c0d8ddd435');
  };

  const handleMenu = async () => {
    const response = await fetch(
      'https://api-rest-luis-r45f.vercel.app/products',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    setArticulos(data);
  };

  useEffect(() => {
    handleMenu();
  }, []);

  return (
    <section id="menu" className="menu section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Menu</h2>
          <p>Consulta Nuestro Menú Sabroso</p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="menu-flters">
              <li
                data-filter="*"
                className={categoria === '' ? 'filter-active' : ''}
                onClick={handleTodos}
              >
                Todos
              </li>
              <li
                data-filter=".filter-starters"
                className={categoria === '641f6a66e60485c0d8ddd433' ? 'filter-active' : ''}
                onClick={handleDesayuno}
              >
                Desayunos
              </li>
              <li
                data-filter=".filter-salads"
                className={categoria === '641f6a5de60485c0d8ddd431' ? 'filter-active' : ''}
                onClick={handleComidas}
              >
                Comidas
              </li>
              <li
                data-filter=".filter-specialty"
                className={categoria === '641f6a6be60485c0d8ddd435' ? 'filter-active' : ''}
                onClick={handleBebidas}
              >
                Bebidas
              </li>
            </ul>
          </div>
        </div>
        <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
          {articulos
            .filter((art) => categoria === '' || art.categorie._id === categoria)
            .map((art) => (
              <div className="col-lg-6 menu-item">
                <img src={art.image.secure_url} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">{art.name}</a>
                  <span>${art.price}</span>
                </div>
                <div className="menu-ingredients">{art.description}</div>
              </div>
            ))}
        </div>



      </div>
    </section>
  );
};

export default Menu;