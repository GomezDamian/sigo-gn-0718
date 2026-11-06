import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosPrueba } from '../data/usuarios';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const encontrado = usuariosPrueba.find(
      (u) => u.usuario === usuario && u.contraseña === contrasena
    );

    if (encontrado) {
      const { contraseña, ...usuarioSinPassword } = encontrado;
      localStorage.setItem("sigoUsuario", JSON.stringify(usuarioSinPassword));
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
      <h2>Iniciar Sesión - SIGO-GN</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Usuario:</label>
          <input 
            type="text" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Contraseña:</label>
          <input 
            type="password" 
            value={contrasena} 
            onChange={(e) => setContrasena(e.target.value)} 
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}
    </div>
  );
}