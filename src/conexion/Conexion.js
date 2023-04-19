import { useState, useEffect } from 'react';
import { Image} from 'react'

function Prueba() {

  const [articulos, setArticulos] = useState([])
  const [recuperado, setRecuperado] = useState(false)


  function mostrarTabla() {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map(art => {
              return (
                <tr key={art._id}>
                  <td>{art.name}</td>
                  <td>{art.description}</td>
                  <td>{art.price}</td>

                  <td><img src={ art.image.secure_url} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  // https://scratchya.com.ar/react/datos.php
  useEffect(() => {
    fetch('https://api-rest-luis-r45f.vercel.app/products')
      .then((response) => {
        // console.log(response)
        return response.json()
      })
      .then((articulos) => {
        // console.log(articulos)
        setArticulos(articulos)
        setRecuperado(true)
      })
  }, [])

  if (recuperado)
    return mostrarTabla()
  else
    return (<div>recuperando datos...</div>)
}

export default Prueba