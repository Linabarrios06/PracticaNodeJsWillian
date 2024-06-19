const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const tareasFilePath = './tareas.json';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/tareas', (req, res) => {
    fs.readFile(tareasFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error al leer las tareas');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.post('/api/tareas', (req, res) => {
    fs.readFile(tareasFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error al leer las tareas');
            return;
        }
        const tareas = JSON.parse(data);
        const nuevaTarea = {
            id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
            descripcion: req.body.descripcion,
            completada: false
        };
        tareas.push(nuevaTarea);
        fs.writeFile(tareasFilePath, JSON.stringify(tareas), (err) => {
            if (err) {
                res.status(500).send('Error al guardar la tarea');
                return;
            }
            res.status(201).send(nuevaTarea);
        });
    });
});

app.delete('/api/tareas/:id', (req, res) => {
    fs.readFile(tareasFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error al leer las tareas');
            return;
        }
        let tareas = JSON.parse(data);
        const tareaId = parseInt(req.params.id, 10);
        tareas = tareas.filter(t => t.id !== tareaId);
        fs.writeFile(tareasFilePath, JSON.stringify(tareas), (err) => {
            if (err) {
                res.status(500).send('Error al guardar las tareas');
                return;
            }
            res.status(204).send();
        });
    });
});

app.listen(PORT, () => {
    console.log(Servidor escuchando en http://localhost:${PORT});
});

