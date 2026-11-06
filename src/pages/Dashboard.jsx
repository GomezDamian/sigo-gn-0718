import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const usuarioGuardado = JSON.parse(localStorage.getItem("sigoUsuario")) || {};

  const handleLogout = () => {
    localStorage.removeItem("sigoUsuario");
    navigate('/');
  };

  return (
    <div style={{ background: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>
        Bienvenido, {usuarioGuardado.nombre || 'Usuario'}
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Sistema de Gestión Operativa (SIGO-GN) - Panel de Control de Entrada y Salida
      </p>
      <button 
        onClick={handleLogout} 
        style={{ padding: '0.75rem 1.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}