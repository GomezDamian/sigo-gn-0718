import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Expedientes from './pages/Expedientes';
import RutaProtegida from './components/RutaProtegida';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            } 
          />
          <Route 
            path="/expedientes" 
            element={
              <RutaProtegida>
                <Expedientes />
              </RutaProtegida>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}