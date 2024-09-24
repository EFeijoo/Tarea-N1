let materias = [];

function addMateria(nombre, cantidad) {
    materias.push({ id: materias.length + 1, nombre, cantidad });
}

function deleteAllMaterias() {
    materias = [];
}

function deleteMateriaById(id) {
    const index = materias.findIndex(m => m.id === parseInt(id));
    if (index !== -1) {
        materias.splice(index, 1);
        return { message: 'Materia eliminada' };
    }
    return { message: 'Materia no encontrada' };
}

module.exports = { materias, addMateria, deleteAllMaterias, deleteMateriaById };