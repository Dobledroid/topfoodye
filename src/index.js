import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from './paginacion/contexts/SessionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter>

        <App />
        
      </BrowserRouter>
    </SessionProvider>

  </React.StrictMode>
);
