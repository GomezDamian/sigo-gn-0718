import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '1rem', textAlign: 'center' }}>
        <h1>SIGO-GN · Unidad 18</h1>
      </header>
      <main style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <Outlet />
      </main>
    </div>
  );
}