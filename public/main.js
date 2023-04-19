import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"


import { auth } from "./app/firebase.js";
// import { loginCheck } from "./app/loginCheck.js";


// import './app/signupForm.js'
// import './app/signInForm.js'
import './app/googleLogin.js'
import './app/facebookLogin.js'
// import './app/logout.js'

// import './app/facebookLogin.js'


onAuthStateChanged(auth, async (user) => {
    loginCheck(user)
    console.log("Iniciado")
})