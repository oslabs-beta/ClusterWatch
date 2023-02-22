import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('mainBody'));
root.render(<App />);
