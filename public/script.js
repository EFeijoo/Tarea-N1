const form = document.getElementById('materiaForm');
const materiasList = document.getElementById('materiasList');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;

    await fetch('/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, cantidad })
    });

    form.reset();
    fetchMaterias();
});

async function fetchMaterias() {
    const response = await fetch('/materias');
    const materias = await response.json();
    materiasList.innerHTML = '';
    materias.forEach(materia => {
        const li = document.createElement('li');
        li.textContent = `${materia.nombre} - ${materia.cantidad} alumnos `;
        
        // Botón para eliminar la materia
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteMateria(materia.id);

        // Añadir el botón al elemento de la lista
        li.appendChild(deleteButton);
        materiasList.appendChild(li);
    });
}

async function deleteMateria(id) {
    await fetch(`/materias/${id}`, {
        method: 'DELETE'
    });
    fetchMaterias();
}

fetchMaterias();