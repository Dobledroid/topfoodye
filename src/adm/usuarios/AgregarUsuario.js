import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const AgregarUsuario = ({ guardarRecuperado, cerrarComponente }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  // const [tipoUsuario, setTipoUsuario] = useState("");
  // const [typeUser, setTypeUser] = useState([]);


    // Carga la lista de categorías cuando se monta el componente
    // useEffect(() => {
    //   async function fetchTypeUser() {
    //     const response = await fetch("https://api-rest-luis-r45f.vercel.app/usertype");
    //     const data = await response.json();
    //     setTypeUser(data);
    //   }
    //   fetchTypeUser();
    // }, []);

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
      const response = await fetch("https://api-rest-luis-r45f.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, password: password, email: email}),
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
          placeholder="Ingrese un nombre"
          required 
          maxLength="28"
          minLength="3"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Correo eléctronico:</label>
        <input
          type="email"
          className="form-control"
          required 
          placeholder="Ingrese un correo eléctronico"
          maxLength="28"
          minLength="3"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
        Agregar Usuario
      </button>
      <button type="submit" className="btn btn-secondary" onClick={()=>{cerrarComponente()}} style={{ marginLeft: '20px' }}>
        Regresar
      </button>
    </form>
    <br/>

    </div>
  )
};

export default AgregarUsuario;
