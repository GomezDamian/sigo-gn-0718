const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DIR_EXPEDIENTES = path.join(__dirname, 'data', 'expedientes');

// Asegurar que la carpeta exista por seguridad
if (!fs.existsSync(DIR_EXPEDIENTES)) {
    fs.mkdirSync(DIR_EXPEDIENTES, { recursive: true });
}

// 1. GET /expedientes: Lee todos los archivos .json de la carpeta y los regresa como arreglo JSON
app.get('/expedientes', (req, res) => {
    fs.readdir(DIR_EXPEDIENTES, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer los expedientes' });
        }

        const jsonFiles = files.filter(file => path.extname(file) === '.json');
        const expedientes = jsonFiles.map(file => {
            const filePath = path.join(DIR_EXPEDIENTES, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(content);
        });

        res.json(expedientes);
    });
});

// 2. GET /expedientes/:folio: Lee y regresa un solo archivo por su nombre de folio
app.get('/expedientes/:folio', (req, res) => {
    const filePath = path.join(DIR_EXPEDIENTES, `${req.params.folio}.json`);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Expediente no encontrado' });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(content));
});

// 3. POST /expedientes: Recibe datos y guarda un nuevo archivo .json con el folio[cite: 3]
app.post('/expedientes', (req, res) => {
    const nuevoExpediente = req.body;
    const folio = nuevoExpediente.folio;

    if (!folio) {
        return res.status(400).json({ error: 'El folio es obligatorio' });
    }

    const filePath = path.join(DIR_EXPEDIENTES, `${folio}.json`);
    fs.writeFileSync(filePath, JSON.stringify(nuevoExpediente, null, 2), 'utf-8');
    
    res.status(201).json({ mensaje: 'Expediente creado con éxito', expediente: nuevoExpediente });
});

// 4. PUT /expedientes/:folio: Recibe datos actualizados y sobrescribe el archivo[cite: 3]
app.put('/expedientes/:folio', (req, res) => {
    const folio = req.params.folio;
    const filePath = path.join(DIR_EXPEDIENTES, `${folio}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Expediente no encontrado' });
    }

    const expedienteActualizado = { ...req.body, folio };
    fs.writeFileSync(filePath, JSON.stringify(expedienteActualizado, null, 2), 'utf-8');
    
    res.json({ mensaje: 'Expediente actualizado', expediente: expedienteActualizado });
});

// 5. DELETE /expedientes/:folio: Elimina físicamente el archivo con fs.unlinkSync[cite: 3]
app.delete('/expedientes/:folio', (req, res) => {
    const folio = req.params.folio;
    const filePath = path.join(DIR_EXPEDIENTES, `${folio}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Expediente no encontrado' });
    }

    try {
        fs.unlinkSync(filePath); // Elimina físicamente el archivo .json de disco[cite: 3]
        res.json({ mensaje: `Expediente ${folio} eliminado correctamente` });
    } catch (err) {
        res.status(500).json({ error: 'No se pudo eliminar el archivo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});