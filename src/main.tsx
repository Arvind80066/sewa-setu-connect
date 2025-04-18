
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(<App />);

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
