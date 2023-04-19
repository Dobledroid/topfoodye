const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = 4000;

app.get('/backup', (req, res) => {
  const dbUrl = 'mongodb://localhost:27017/alumnos'; // Cambia esta URL por la de tu base de datos
  const backupPath = './'; // Cambia esta ruta por la ruta donde quieras guardar el archivo de backup
  const backupName = 'backup-' + Date.now() + '.tar.gz';
  // const dumpProcess = spawn('mongodump', [`--uri=${dbUrl}`, `--out=${backupPath}`]);
  const dumpProcess = spawn('mongodump', [`--uri=${dbUrl}`, `--archive=${backupPath}/mydatabase.zip`, `--gzip`]);
  
  dumpProcess.on('exit', (code, signal) => {
    if (code === 0) {
      res.status(200).sendFile(`${backupPath}/mydatabase.tar`);
    } else {
      res.status(500).send(`Error al hacer el backup: ${signal || code}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});