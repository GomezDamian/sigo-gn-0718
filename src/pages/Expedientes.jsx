import React, { useEffect, useState } from 'react';

export default function Expedientes() {
    const [expedientes, setExpedientes] = useState([]);
    const [formData, setFormData] = useState({
        folio: 'EXP-0718-',
        nombreOperativo: '',
        tipoIncidente: '',
        zona: '',
        fecha: '',
        descripcion: ''
    });
    const [editando, setEditando] = useState(false);

    // Función para obtener los expedientes del backend mediante fetch
    const obtenerExpedientes = () => {
        fetch('http://localhost:4000/expedientes')
            .then(res => res.json())
            .then(data => setExpedientes(data))
            .catch(err => console.error('Error al cargar expedientes:', err));
    };

    // Al cargar el componente, ejecuta el fetch[cite: 3]
    useEffect(() => {
        obtenerExpedientes();
    }, []);

    // Manejar los cambios en el formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Crear o actualizar un expediente (POST / PUT)
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editando 
            ? `http://localhost:4000/expedientes/${formData.folio}`
            : 'http://localhost:4000/expedientes';
        const method = editando ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje || 'Operación exitosa');
            obtenerExpedientes();
            setFormData({ folio: 'EXP-0718-', nombreOperativo: '', tipoIncidente: '', zona: '', fecha: '', descripcion: '' });
            setEditando(false);
        })
        .catch(err => console.error('Error al guardar:', err));
    };

    // Eliminar un expediente (DELETE)[cite: 3]
    const eliminarExpediente = (folio) => {
        if (window.confirm(`¿Estás seguro de eliminar el expediente ${folio}?`)) {
            fetch(`http://localhost:4000/expedientes/${folio}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                alert(data.mensaje);
                obtenerExpedientes();
            })
            .catch(err => console.error('Error al eliminar:', err));
        }
    };

    // Cargar datos en el formulario para editar
    const iniciarEdicion = (exp) => {
        setFormData(exp);
        setEditando(true);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Módulo de Expedientes (Sistema de Archivos)</h2>

            {/* Formulario para registrar o editar */}
            <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>{editando ? 'Editar Expediente' : 'Crear Nuevo Expediente'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input 
                        type="text" 
                        name="folio" 
                        placeholder="Folio (EXP-0718-###)" 
                        value={formData.folio} 
                        onChange={handleChange} 
                        disabled={editando} 
                        required 
                        style={{ padding: '8px' }}
                    />
                    <input 
                        type="text" 
                        name="nombreOperativo" 
                        placeholder="Nombre del Operativo" 
                        value={formData.nombreOperativo} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px' }}
                    />
                    <input 
                        type="text" 
                        name="tipoIncidente" 
                        placeholder="Tipo de Incidente" 
                        value={formData.tipoIncidente} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px' }}
                    />
                    <input 
                        type="text" 
                        name="zona" 
                        placeholder="Zona" 
                        value={formData.zona} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px' }}
                    />
                    <input 
                        type="date" 
                        name="fecha" 
                        value={formData.fecha} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px' }}
                    />
                    <input 
                        type="text" 
                        name="descripcion" 
                        placeholder="Descripción" 
                        value={formData.descripcion} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px', padding: '10px 15px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    {editando ? 'Actualizar Expediente' : 'Guardar Expediente'}
                </button>
                {editando && (
                    <button type="button" onClick={() => { setEditando(false); setFormData({ folio: 'EXP-0718-', nombreOperativo: '', tipoIncidente: '', zona: '', fecha: '', descripcion: '' }); }} style={{ marginLeft: '10px', padding: '10px 15px', background: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        Cancelar
                    </button>
                )}
            </form>

            {/* Tabla para mostrar los expedientes cargados[cite: 3] */}
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '8px' }}>Folio</th>
                        <th style={{ padding: '8px' }}>Operativo</th>
                        <th style={{ padding: '8px' }}>Tipo</th>
                        <th style={{ padding: '8px' }}>Zona</th>
                        <th style={{ padding: '8px' }}>Fecha</th>
                        <th style={{ padding: '8px' }}>Descripción</th>
                        <th style={{ padding: '8px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {expedientes.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '15px' }}>
                                No hay expedientes registrados todavía.
                            </td>
                        </tr>
                    ) : (
                        expedientes.map((exp, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px' }}>{exp.folio}</td>
                                <td style={{ padding: '8px' }}>{exp.nombreOperativo}</td>
                                <td style={{ padding: '8px' }}>{exp.tipoIncidente}</td>
                                <td style={{ padding: '8px' }}>{exp.zona}</td>
                                <td style={{ padding: '8px' }}>{exp.fecha}</td>
                                <td style={{ padding: '8px' }}>{exp.descripcion}</td>
                                <td style={{ padding: '8px' }}>
                                    <button onClick={() => iniciarEdicion(exp)} style={{ marginRight: '5px', background: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Editar</button>
                                    <button onClick={() => eliminarExpediente(exp.folio)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}