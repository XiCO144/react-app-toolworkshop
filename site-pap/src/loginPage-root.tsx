import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './loginPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    < Login/>
  </React.StrictMode>,
)