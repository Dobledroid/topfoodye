import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AgregarProductos = ({ guardarRecuperado, cerrarComponente }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(null); // Cambiado a null para que sea un objeto File
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);

  // Carga la lista de categorías cuando se monta el componente
  useEffect(() => {
    async function fetchCategorias() {
      const response = await fetch("https://api-rest-luis-r45f.vercel.app/categorie");
      const data = await response.json();
      setCategorias(data);
    }
    fetchCategorias();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(); // Crea un nuevo objeto FormData
    formData.append("name", nombre);
    formData.append("description", descripcion);
    formData.append("price", precio);
    formData.append("categorie", categoria);
    formData.append("stock", stock);
    formData.append("image", imagen); // Agrega la imagen al objeto FormData

    const response = await fetch("https://api-rest-proyecto.onrender.com/products", {
      method: "POST",
      body: formData, // Usa el objeto FormData como cuerpo de la solicitud
    });

    if (response.status === 200) {
      // console.log("Status 200 OK");


      const data = await response.json();
      // console.log(data)
      guardarRecuperado((r) => !r);
      
      Swal.fire({
        title: "Insertado",
        text: "Documento insertado con éxito",
        icon: "success",
        confirmButtonText: "Cerrar",
      }).then((result) => {
        if (result.isConfirmed) {
          // window.location.reload();
          cerrarComponente();
        }
      });
    } else {
      // console.log("Ha ocurrido un error");
      Swal.fire({
        title: "Error",
        text: "Documentos no insertados",
        icon: "error",
        confirmButtonText: "Cerrar",
      })
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese el nombre del producto"
            required
            minLength="3"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese la descripción del producto"
            required
            minLength="3"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese el precio del producto"
            required
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Existencias:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese la existencia"
            required
            value={stock}
            onChange={(event) => setStock(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
            required
            accept="image/*" // Agrega el atributo "accept" para limitar la selección de archivos a imágenes
            className="form-control"
            onChange={(event) => {
              const selectedFile = event.target.files[0];
              // Valida si el archivo seleccionado es una imagen y si su tamaño es menor a 3 MB
              if (selectedFile && selectedFile.type.includes("image/") && selectedFile.size <= 3 * 1024 * 1024) {
                setImagen(selectedFile); // Actualiza el estado de "imagen" con el archivo seleccionado
              } else {
                // Muestra un mensaje de error si el archivo seleccionado no es una imagen o su tamaño es mayor a 3 MB
                alert("Por favor selecciona una imagen con un tamaño menor a 3 MB.");
                event.target.value = null; // Limpia el valor del input para permitir seleccionar otro archivo
              }
            }}
          />
        </div>
        <div className="form-group">
          <label>Categoria:</label>
          <select className="form-control" value={categoria} onChange={(event) => setCategoria(event.target.value)}>
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.categorie}</option>
            ))}
          </select>
        </div>

        <br />
        <button type="submit" className="btn btn-primary">
          Agregar producto
        </button>

        <button type="submit" className="btn btn-secondary" onClick={() => { cerrarComponente() }} style={{ marginLeft: '20px' }}>
          Regresar
        </button>
      </form>
      <br />

    </div>
  )
};

export default AgregarProductos
