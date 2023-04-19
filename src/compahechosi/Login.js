import React, { useState, useEffect } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión guardada en el almacenamiento local al cargar la página
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const username = localStorage.getItem('username');
      setUsername(username);
      setIsLoggedIn(loggedIn);
    }
  }, []);

  const handleLogin = () => {
    // Realizar aquí la lógica de autenticación con la API
    // Por simplicidad, asumiremos que cualquier combinación de usuario y contraseña es válida
    setIsLoggedIn(true);

    // Guardar la sesión en el almacenamiento local
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    // Eliminar la sesión del almacenamiento local
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Bienvenido, {localStorage.getItem('username')}!</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <p>Introduce tus credenciales:</p>
          <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
}

export default Login;
