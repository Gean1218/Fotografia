import { config } from './config.js';

// Inicializar Firebase com config externa
firebase.initializeApp(config.firebase);
firebase.analytics();

// Instância do auth
const auth = firebase.auth();

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Login bem-sucedido
      console.log("Login feito com sucesso");
      window.location.href = "configurao.html";
    })
    .catch((error) => {
      document.getElementById("error").textContent = "Erro: " + error.message;
    });
});
