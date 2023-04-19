const express = require('express');
const { exec } = require('child_process');

const app = express();

// Configura los parámetros de conexión a la base de datos
const host = 'localhost';
const port = '27017';
const database = 'blogNoticias';

// Configura los parámetros de la copia de seguridad
const backupPath = './copia';
const backupName = 'backup-' + Date.now() + '.tar.gz';

// Maneja la solicitud de copia de seguridad
app.get('/backup', (req, res) => {
  // Ejecuta el comando mongodump para crear la copia de seguridad
  exec(`mongodump --host ${host} --port ${port} --db ${database} --archive=${backupPath}/${backupName} --gzip`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al ejecutar el comando mongodump: ${err}`);
      res.status(500).send('Error al crear la copia de seguridad');
      return;
    }
    console.log(`Copia de seguridad creada en ${backupPath}/${backupName}`);
    res.send('Copia de seguridad creada');
  });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
