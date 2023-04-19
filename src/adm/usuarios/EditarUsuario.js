import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EditarUsuario = ({ usuario, guardarUsuarioEditando, guardarRecuperado, cerrarComponente }) => {
  const [id, setId] = useState(usuario._id);
  const [nombre, setNombre] = useState(usuario.name);
  const [password, setPassword] = useState(usuario.password);
  const [password2, setPassword2] = useState(usuario.password);
  const [email, setEmail] = useState(usuario.email);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validaciones = () => {
    const mayusculas = /[A-Z]/;
    const minusculas = /[a-z]/;
    const numeros = /\d/;
    const caracteres = /[!@#$%^&*()\-_=+{};:,<.>]/;

    const errors = [];

    if (!mayusculas.test(password)) {
      errors.push("La contraseña debe tener al menos una letra mayúscula.");
    }

    if (!minusculas.test(password)) {
      errors.push("La contraseña debe tener al menos una letra minúscula.");
    }

    if (!numeros.test(password)) {
      errors.push("La contraseña debe tener al menos un número.");
    }

    if (!caracteres.test(password)) {
      errors.push("La contraseña debe tener al menos un carácter especial.");
    }

    if (password != password2) {
      errors.push("Las contraseñas no coinciden.");
    }

    if (errors.length > 0) {
      const errorMessage = errors.join(" ");

      // setPasswordError(errors.join(" "));
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Cerrar",
      });

      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validaciones()){
      const response = await fetch(`https://api-rest-luis-r45f.vercel.app/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nombre, email: email, password: password }),
      });

      if (response.status === 200) {
        // console.log("Status 200 OK");
    
        const data = await response.json();
        // console.log(data)
        guardarUsuarioEditando(null);
        guardarRecuperado(false);
        
        Swal.fire({
          title: "Actualizado",
          text: "Documento actualizado con éxito",
          icon: "success",
          confirmButtonText: "Cerrar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
            // cerrarComponente();
          }
        });
      } else {
        // console.log("Ha ocurrido un error");
        Swal.fire({
          title: "Error",
          text: "Documentos no actualizados",
          icon: "error",
          confirmButtonText: "Cerrar",
        })
      }
    }
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleCancelar = () => {
    cerrarComponente();
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            placeholder="Ingresa el nombre"
            name="nombre"
            value={nombre}
            onChange={handleChangeNombre}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo eléctronico:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingrese un correo eléctronico"
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          placeholder="Ingrese una contraseña"
          required maxLength="28" minLength="8"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirme su contraseña:</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirme su contraseña"
          required maxLength="28" minLength="8"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        />
      </div>
      <br/>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancelar} style={{ marginLeft: '20px' }} >
          Salir
        </button>
      </form>
  );
};

export default EditarUsuario;
