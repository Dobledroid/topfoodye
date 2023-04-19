import React,{useContext,useState} from 'react';
import '../css/login.css';
import logo from '../img/icon-helado.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';

export default function Login() {
  const url = 'https://node-v-lyart.vercel.app/api/users';
  const { login } = useContext(AuthContext);
  const history = useNavigate();
  const [userr,setUser]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin =(e) => {
    e.preventDefault();
    if (password.length < 2) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const user = data.find(u => u.correo === email && u.contraseña === password && u.nombreUsers===userr);
        if (user) {
          login(user);
          history('/');
        } else {
          setErrorMessage('El correo electrónico o la contraseña son incorrectos');
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('Hubo un error al iniciar sesión');
      });
  };
  return (
    <div>
      
    <main id="main" className="d-flex w-100 background-dack">

    <div className="container d-flex flex-column">

        <div className="row vh-100">
            <div className="col-sm-10 col-md-6 col-lg-4 mx-auto d-table h-100">
                <div className="d-table-cell align-middle">


                    <div className="card card-login rounded-7">
                        <div className="card-body">
                            <div className="m-sm-1">
                                <div className="text-center mb-4">
                                    <img src={logo} alt="Logo" className="img-fluid " width="100" />
                                </div>{errorMessage !== '' && (
                                        <label  className='color-red text-center'>{errorMessage}</label>
                                      )}
                                    <form onSubmit={handleLogin}>
                                        
                                    <div className="mb-2">
                                        <label className="form-label mb-1 text-primary">Usuario</label>
                                        <input className="form-control form-control-lg input-login rounded-1 text-black"
                                            type="text" name="inp_usario" onChange={(e)=>setUser(e.target.value)}
                                            placeholder="Introduce tu usuario" required />
                                    </div>
                                      <div className="mb-2">
                                        <label className="form-label mb-1 text-primary">Correo electrónico</label>
                                        <input className="form-control form-control-lg input-login rounded-1 text-black"
                                            type="email" name="inp_email" onChange={(e)=>setEmail(e.target.value)}
                                            placeholder="Introduce tu correo electrónico" required/>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label mb-1 text-primary">Contraseña</label>
                                        <input className="form-control form-control-lg input-login rounded-1 text-black"
                                            type="password" name="inp_password" onChange={(e)=>setPassword(e.target.value)}
                                            placeholder="Ingresa tu contraseña" required/>

                                    </div>

                                    <div className="text-center mt-3">
                                        <input  type="submit" className="btn btn-lg btn-black  rounded-8" value="Iniciar sesión"/>
                                    </div>
                                    <br/>

                      
                                    <a href="recuperar_passw.php" className="account ">¿Se te olvidó tu contraseña?</a>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </main>
    </div>
  )
}