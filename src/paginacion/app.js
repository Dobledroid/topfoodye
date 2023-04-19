const backupButton = document.getElementById('backupButton');
backupButton.addEventListener('click', () => {
  fetch('http://localhost:3000/backup')
    .then((response) => {
      console.log('Copia de seguridad creada');
    })
    .catch((error) => {
      console.error('Error al crear la copia de seguridad:', error);
    });
});
