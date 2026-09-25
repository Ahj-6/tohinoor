import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/vendor/adminlte.rtl.css';
import './styles.css';
import App from './App.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

document.documentElement.lang = 'fa';
document.documentElement.dir = 'rtl';

document.body.className = 'layout-fixed sidebar-expand-lg bg-body-tertiary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
