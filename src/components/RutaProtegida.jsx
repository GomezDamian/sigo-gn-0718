import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
  const usuarioSesion = localStorage.getItem("sigoUsuario");
  
  if (!usuarioSesion) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}