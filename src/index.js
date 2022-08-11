import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'tachyons';
import { BrowserRouter } from 'react-router-dom'; 
import { TextProvider } from './components/Contexts/textProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProviderFunc } from './components/Contexts/ProvidersContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ProviderFunc>
          <TextProvider>
            <App/>
          </TextProvider>
        </ProviderFunc>
    </BrowserRouter>
  </React.StrictMode>
);

