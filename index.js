const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const tareasFilePath = './tareas.json';

app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    fs.readFile(tareasFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de tareas' });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para agregar una nueva tarea
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = req.body;
    fs.readFile(tareasFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de tareas' });
        }
        const tareas = JSON.parse(data);
        tareas.push(nuevaTarea);
        fs.writeFile(tareasFilePath, JSON.stringify(tareas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar la nueva tarea' });
            }
            res.status(201).json(nuevaTarea);
        });
    });
});

// Ruta para eliminar una tarea
app.delete('/api/tareas/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(tareasFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de tareas' });
        }
        let tareas = JSON.parse(data);
        tareas = tareas.filter(t => t.id !== id);
        fs.writeFile(tareasFilePath, JSON.stringify(tareas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar la tarea' });
            }
            res.status(204).send();
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
