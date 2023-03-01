import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import ReactDom, { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('mainBody'));
root.render(
  <ProSidebarProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProSidebarProvider>
);
