import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const root = createRoot(document.getElementById('mainBody'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
