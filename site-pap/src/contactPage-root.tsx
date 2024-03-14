import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContactPage } from './contactPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    < ContactPage/>
  </React.StrictMode>,
)