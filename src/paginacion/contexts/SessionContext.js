import { createContext, useState } from 'react';

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function login(user) {
    setUser(user);
    setLoggedIn(true);
  }

  function logout() {
    setUser(null);
    setLoggedIn(false);
  }

  return (
    <SessionContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
