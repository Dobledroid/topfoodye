import React from "react";
import IconLogin from "./assets/login-icon.svg";
import IconUsuario from "./assets/username-icon.svg";
import IconPassword from "./assets/password-icon.svg";
import IconLogo from "./assets/logo-vt.svg";
import IconGoogle from "./assets/google-icon.svg";
import IconFacebook from "./assets/facebook-svgrepo-com.svg";
import Header from "../estructura/Header";
import Footer from "../estructura/Footer";

function LoginForm() {
  return (
    <div>
      <Header />
      <div >
        <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: "100px" }}>
          <div
            className="p-5 rounded-5 text-secondary shadow-lg"
            style={{ width: "25rem", marginTop: '170px', backgroundColor: '#661141' } }
          >
            <div className="d-flex justify-content-center">
              <img src={IconLogin} alt="login-icon" style={{ height: "7rem" }} />
            </div>
            <div className="text-center fs-1 fw-bold">Inicia sesión</div>
            <div className="input-group mt-4">
              <div className="input-group-text bg-info">
                <img
                  src={IconUsuario}
                  alt="username-icon"
                  style={{ height: "1rem" }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="text"
                placeholder="Ingrese su email"
              />
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconPassword}
                  alt="password-icon"
                  style={{ height: "1rem" }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="password"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <div className="d-flex justify-content-around mt-1">
                  {/* <div className="d-flex align-items-center gap-1">
              <input className="form-check-input" type="checkbox" />
              <div className="pt-1" style={{ fontSize: "0.9rem" }}>Remember me</div>
            </div> */}
                  {/* <div className="pt-1">
              <a href="#" className="text-decoration-none text-info fw-semibold fst-italic" style={{ fontSize: "0.9rem" }}>Forgot your password?</a>
            </div> */}
            </div>
            <div className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
              Ingresar
            </div>
            <div className="d-flex gap-1 justify-content-center mt-3">
              <div>¿No tienes una cuenta?</div>
              <a href="#" className="text-decoration-none text-info fw-semibold">
                Regístrate aquí
              </a>
            </div>
            <div className="d-flex gap-1 justify-content-center mt-1">
              <div>¿Olvidaste tu contraseña?</div>
              <a href="#" className="text-decoration-none text-info fw-semibold">
                Ingresa aquí
              </a>
            </div>
            <div className="p-3">
              <div
                className="border-bottom text-center"
                style={{ height: "0.9rem" }}
              >
                {/* <span className="bg-white px-3">or</span> */}
                {/* <span className="bg-white px-3">or</span> */}
              </div>
            </div>
            <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm">
              <img
                src={IconGoogle}
                alt="google-icon"
                style={{ height: "1.6rem" }}
              />
              <div className="fw-semibold text-secondary">
                Continuar con Google
              </div>
            </div>
            <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm">
              <img
                src={IconFacebook}
                alt="google-icon"
                style={{ height: "1.6rem" }}
              />
              <div className="fw-semibold text-secondary">
                Continuar con Facebook
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginForm;
