document.addEventListener('DOMContentLoaded', () => {
    const formTarea = document.getElementById('form-tarea');
    const listaTareas = document.getElementById('lista-tareas');

    const cargarTareas = async () => {
        const response = await fetch('/api/tareas');
        const tareas = await response.json();
        listaTareas.innerHTML = '';
        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.textContent = tarea.descripcion;
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', async () => {
                await fetch(`/api/tareas/${tarea.id}`, { method: 'DELETE' });
                cargarTareas();
            });
            li.appendChild(btnEliminar);
            listaTareas.appendChild(li);
        });
    };

    formTarea.addEventListener('submit', async (event) => {
        event.preventDefault();
        const descripcion = document.getElementById('nueva-tarea').value;
        const nuevaTarea = { id: Date.now().toString(), descripcion };
        await fetch('/api/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaTarea)
        });
        document.getElementById('nueva-tarea').value = '';
        cargarTareas();
    });

    cargarTareas();
});
