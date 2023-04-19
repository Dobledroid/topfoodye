import React from 'react';
import axios from 'axios';
import Footer from '../../../estructura/Footer'
import Header from '../../../estructura/Header'

const BackupDB = () => {
  function handleBackup() {
    axios.get('http://localhost:4000/backup')
      .then(response => {
        // Hacer algo con el archivo de backup
        console.log(response.data);
      })
      .catch(error => {
        // Manejar errores
        console.error(error);
      });
  }
  
  return (
    <div>
      <Header/>
        <div style={{marginTop:"100px" , marginBottom:"100px"}}>
          <button className='btn btn-warning' onClick={handleBackup}>REALIZAR BACKUP</button>
        </div>
      <Footer/>
    </div>
  )
}

export default BackupDB;
