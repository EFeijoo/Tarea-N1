const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { materias, addMateria, deleteAllMaterias, deleteMateriaById } = require('./materias');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // Manejo de archivos estáticos
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/public/index.html') {
        fs.readFile(path.join(__dirname, '../public/index.html'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'No encontrado' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (parsedUrl.pathname === '/public/styles.css') {
        fs.readFile(path.join(__dirname, '../public/styles.css'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'No encontrado' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (parsedUrl.pathname === '/public/script.js') {
        fs.readFile(path.join(__dirname, '../public/script.js'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'No encontrado' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/materias') {
        res.end(JSON.stringify(materias));
    } else if (req.method === 'POST' && parsedUrl.pathname === '/materias') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { nombre, cantidad } = JSON.parse(body);
            addMateria(nombre, cantidad);
            res.end(JSON.stringify({ message: 'Materia agregada' }));
        });
    } else if (req.method === 'DELETE' && parsedUrl.pathname === '/materias') {
        deleteAllMaterias();
        res.end(JSON.stringify({ message: 'Todas las materias eliminadas' }));
    } else if (req.method === 'DELETE') {
        const id = parsedUrl.pathname.split('/')[2];
        const result = deleteMateriaById(id);
        res.end(JSON.stringify(result));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
});

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});