import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const EditarUsuario = ({ articulos, guardarProdEditando, guardarRecuperado, cerrarComponente }) => {
  const [id, setId] = useState(articulos._id);
  const [nombre, setNombre] = useState(articulos.name);
  const [descripcion, setDescripcion] = useState(articulos.description);
  const [precio, setPrecio] = useState(articulos.price);
  const [stock, setStock] = useState(articulos.stock);
  const [categoria, setCategoria] = useState(articulos.categorie._id);

  const [imagen, setImagen] = useState(null);
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
    formData.append('name', nombre);
    formData.append('description', descripcion);
    formData.append('price', precio);
    formData.append('categorie', categoria);
    formData.append("stock", stock);
    if (imagen !== null) {
      formData.append('image', imagen);
    }

    const response = await fetch(`https://api-rest-proyecto.onrender.com/updateProducts/${id}`, {
      method: "PUT",
      body: formData
    });

    if (response.status === 200) {
      // console.log("Status 200 OK");

      const data = await response.json();
      // console.log(data)
      guardarProdEditando(null);
      guardarRecuperado(false);
      Swal.fire({
        title: "Actualizado",
        text: "Documentos actualizados",
        icon: "success",
        confirmButtonText: "Cerrar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      // console.log("Ha ocurrido un error");
      Swal.fire({
        title: "Error",
        text: "Documentos no actulizados",
        icon: "error",
        confirmButtonText: "Cerrar",
      })
    }
  };

  const handleCancelar = () => {
    cerrarComponente();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          required
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Descripcion:</label>
        <input
          type="text"
          className="form-control"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Precio:</label>
        <input
          type="number"
          className="form-control"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
        />
      </div>
      <div className="form-group">
          <label>Existencias:</label>
          <input
            type="number"
            className="form-control"
            required
            value={stock}
            onChange={(event) => setStock(event.target.value)}
          />
        </div>
      <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
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
      <br/>
      <button type="submit" className="btn btn-primary">
        Actualizar
      </button>
      <button type="button" className="btn btn-secondary" onClick={handleCancelar} style={{marginLeft: '20px'}}>
          Salir
        </button>
    </form>
  )
};

export default EditarUsuario;
