import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'tachyons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextProvider } from './components/Contexts/TextProvider';
import { ProviderFunc } from './components/Contexts/ProvidersContext';
import { ScrollProvider } from './components/Contexts/ScrollProvider';
import { User } from './components/Contexts/UserData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderFunc>
        <TextProvider>
          <ScrollProvider>
            <User>
              <App />
            </User>
          </ScrollProvider>
        </TextProvider>
      </ProviderFunc>
    </BrowserRouter>
  </React.StrictMode>,
);
