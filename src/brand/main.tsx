import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../shared/store/store';
import BrandApp from './BrandApp';
import '../shared/index.css';

// Handle messages from parent window
window.addEventListener('message', (event) => {
  const allowedOrigins = [
    'https://lucidaclub.com',
    'https://brand1products.lucidaclub.com',
    window.location.origin
  ];
  
  if (allowedOrigins.includes(event.origin)) {
    switch (event.data.type) {
      case 'GET_CONTENT_HEIGHT':
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({
          type: 'RESIZE_IFRAME',
          height
        }, '*');
        break;
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BrandApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);