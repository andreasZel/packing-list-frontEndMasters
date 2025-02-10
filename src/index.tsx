import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './components/application';

import './index.css';
import { ItemsProvider } from './lib/ItemsContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ItemsProvider>
      <Application />
    </ItemsProvider>
  </React.StrictMode>,
);
