import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './src/animations.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Enhanced rendering with error boundary
const render = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Initial render
render();

// Hot Module Replacement (HMR) for development
if (import.meta.hot) {
  import.meta.hot.accept('./App', () => {
    render();
  });
}