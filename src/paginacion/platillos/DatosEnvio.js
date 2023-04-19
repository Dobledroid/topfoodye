import React, { useState, useEffect, useContext } from "react";
import Footer from "../../estructura/Footer";
import Header from "../../estructura/Header";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';

import Swal from 'sweetalert2';

const DatosEnvio = () => {
  const [comidas, setComidas] = useState([]);
  const [urlImage, setUrlImage] = useState('https://via.placeholder.com/200')

  const [colonia, setColonia] = useState('')
  const [calle, setCalle] = useState('')
  const [noCasa, setNoCasa] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [referencias, setReferencias] = useState('')


  const { loggedIn, user, logout } = useContext(SessionContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { datos } = location.state;

  const [userId, setUserId] = useState(datos.userId)
  const [producto, setProducto] = useState(datos.producto)
  const [cantidad, setCantidad] = useState(datos.cantidad)
  const [total, setTotal] = useState(datos.total)
  const [newStock, setNewStock] = useState(datos.newStock)

    // Acceder a los datos
  // console.log(datos.userId);
  // console.log(datos.producto);
  // console.log(datos.cantidad);
  // console.log(datos.total);
  // console.log(datos.newStock);

  const handleVolver = () => {
    navigate('/platillos');
  }

  const handleConfirmar = async(event) => {
    event.preventDefault();
    try {
      //insertamos el producto comprado en la coleccion de ventas
      const res = await fetch('https://api-rest-luis-r45f.vercel.app/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userId,
          products: {
              product: producto,//id del producto seleccionado
              quantity: cantidad
            },
          totalPrice: total
        })
      })
      const data = await res.json()

      //actualizamos el stock del producto comprado pasandole el id del producto
      const actProducto = await fetch(`https://api-rest-luis-r45f.vercel.app/updateProducts/${producto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stock: newStock //stock que se recupero de la pantalla VerProducto
        })
      })

      //insertamos en la coleccion envios los datos ingresados
      const res2 = await fetch('https://api-rest-luis-r45f.vercel.app/envios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({//json con los datos a insertar en la coleccion envios
          colonia: colonia,
          calle: calle,
          noCasa: noCasa,
          recibe: nombre,
          telefono: telefono,
          referencias: referencias,
          venta: data._id//id que se obtuvo del json regresado anteriormente al realizar la venta
        })
      })

      Swal.fire({
        title: "Exito",
        text: "Compra realizada correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          // cerrarComponente();
          // navigate('/producto')
        }
      });


    } catch (error) {
      console.error(error)
    }
  }


  async function response() {
    const response = await fetch(`https://api-rest-luis-r45f.vercel.app/products/${datos.producto}`)
    const data = await response.json();
    setUrlImage(data.image.secure_url)
    // console.log(data);
    setComidas(data);

  }

  useEffect(() => {
    response();
  }, []);

  return (
    <div>
      {/* <h2>{id}</h2> */}
      <Header />
      <h1 className="titlePlatillos">Confirme su compra</h1>
      {loggedIn ? (
        <span>Usuario iniciado: {user.id}</span>
      ) : (
        <>
        </>
      )}
      <div className="containerPlatillos">
        <div className="cardPlatillos">
          <img
            src={urlImage}
            className="imgPlatillos"
          />
          <form onSubmit={handleConfirmar}>
            <h5 className="mt-3 mb-2">Ingresa tus datos</h5>
            <div>
              <div className="form-group mt-1">
                <label htmlFor="password">Colonia:</label>
              </div>
              <div className="input-group mt-1">
                <input
                  className="form-control bg-light"
                  type="text"
                  placeholder="Ingresa la colonia de tu domiclio"
                  required
                  value={colonia}
                  onChange={(cant) => setColonia(cant.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="form-group mt-1">
                <label htmlFor="password">Ingresa la calle:</label>
              </div>
              <div className="input-group mt-1">
                <input
                  className="form-control bg-light"
                  type="text"
                  placeholder="Ingresa la calle de tu domicio"
                  required
                  value={calle}
                  onChange={(cant) => setCalle(cant.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="form-group mt-1">
                <label htmlFor="password">Número de casa:</label>
              </div>
              <div className="input-group mt-1">
                <input
                  className="form-control bg-light"
                  type="number"
                  placeholder="Ingresa tu No. casa"
                  required
                  value={noCasa}
                  onChange={(cant) => setNoCasa(cant.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="form-group mt-1">
                <label htmlFor="password">Ingresa nombre de quien recibe:</label>
              </div>
              <div className="input-group mt-1">
                <input
                  className="form-control bg-light"
                  type="text"
                  placeholder="Ingresa el nombre de quien recibe"
                  required
                  value={nombre}
                  onChange={(cant) => setNombre(cant.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="form-group mt-1">
                <label htmlFor="password">Ingresa el telefono:</label>
              </div>
              <div className="input-group mt-1">
                <input
                  className="form-control bg-light"
                  type="tel"
                  placeholder="Ingresa un telefono de referencia"
                  required
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={telefono}
                  onChange={(cant) => setTelefono(cant.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="form-group mt-1">
                <label htmlFor="password">Ingresa una referencia:</label>
              </div>
              <div className="input-group mt-1">
                <input
                  className="form-control bg-light"
                  type="text"
                  placeholder="Ingresa una referencia de tu domicilio"
                  required
                  value={referencias}
                  onChange={(cant) => setReferencias(cant.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
              Finalizar compra
            </button>

            {
              paypal.Buttons({
                style:{
                    color:'blue',
                    shape: 'pill',
                    label: 'pay'
                },
                createOrder: function(data, actions){
                    return actions.order.create({
                        purchase_units: [{
                            amount:{
                                value: ''
                            }
                        }]
                    });
                },
                onApprove: function(data, actions){
                    actions.order.capture().then(function(detalles){
                        alert("Pago completado :)");
                        window.location.href="./platillos.php";
                    });
                },
    
                onCancel: function(data){
                    alert("Pago cancelado");
                    console.log(data);
                }
            }).render('#paypal-button-container')
            }
          </form>
          <button type="submit" className="btn btn-warning text-white w-100 mt-4 mb-4 fw-semibold shadow-sm" onClick={handleVolver}>
            Cancelar compra
          </button>
        </div>
      </div>
      <br /> <br />
      <Footer />
    </div>
  );
};

export default DatosEnvio;
