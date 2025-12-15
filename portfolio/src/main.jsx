import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Auth from './pages/Auth.jsx';
import Admin from './pages/Admin.jsx';
import DataContextProvider from './context/DataContextProvider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider> 
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </DataContextProvider>
  </StrictMode>
);
