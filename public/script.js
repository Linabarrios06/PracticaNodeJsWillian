document.addEventListener('DOMContentLoaded', cargarTareas);

function cargarTareas() {
    fetch('/api/tareas')
        .then(response => response.json())
        .then(tareas => {
            const listaTareas = document.getElementById('listaTareas');
            listaTareas.innerHTML = '';
            tareas.forEach(tarea => {
                const li = document.createElement('li');
                li.textContent = tarea.descripcion;
                li.dataset.id = tarea.id;
                li.addEventListener('dblclick', eliminarTarea);
                listaTareas.appendChild(li);
            });
        });
}

function agregarTarea() {
    const descripcion = document.getElementById('nuevaTarea').value;
    fetch('/api/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion })
    })
    .then(response => response.json())
    .then(tarea => {
        const listaTareas = document.getElementById('listaTareas');
        const li = document.createElement('li');
        li.textContent = tarea.descripcion;
        li.dataset.id = tarea.id;
        li.addEventListener('dblclick', eliminarTarea);
        listaTareas.appendChild(li);
        document.getElementById('nuevaTarea').value = '';
    });
}

function eliminarTarea(event) {
    const tareaId = event.target.dataset.id;
    fetch(/api/tareas/${tareaId}, {
        method: 'DELETE'
    })
    .then(() => {
        event.target.remove();
    });
}