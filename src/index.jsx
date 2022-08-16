import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'tachyons';
import { TextProvider } from './components/Contexts/textProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProviderFunc } from './components/Contexts/ProvidersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderFunc>
        <TextProvider>
          <App />
        </TextProvider>
      </ProviderFunc>
    </BrowserRouter>
  </React.StrictMode>,
);
