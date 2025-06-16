// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB5D_kl0bgL1XXWQrl5JvcJCP6a5JTndc0",
  authDomain: "fotografa-8f722.firebaseapp.com",
  projectId: "fotografa-8f722",
  storageBucket: "fotografa-8f722.firebasestorage.app",
  messagingSenderId: "548011944901",
  appId: "1:548011944901:web:2a97fbf3f5f41edf08f9ac",
  measurementId: "G-T55QTHJJDY"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
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