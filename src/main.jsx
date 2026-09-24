import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Theme accentColor="indigo" radius="large" appearance="light">
        <App />
      </Theme>
    </StrictMode>
  );
}
