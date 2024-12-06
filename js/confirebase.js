// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4YU252wQT1ez4g-gOQcYRrsEQHXtlx9Y",
  authDomain: "guardiannet-d6cd5.firebaseapp.com",
  projectId: "guardiannet-d6cd5",
  storageBucket: "guardiannet-d6cd5.firebasestorage.app",
  messagingSenderId: "430964208603",
  appId: "1:430964208603:web:8d74b64188bbcd9b11edfe"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Configurar persistencia de autenticación
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log('Persistencia configurada correctamente');
  })
  .catch((error) => {
    console.error('Error configurando persistencia:', error);
  });

// Variables para controlar el modo del formulario
let isLoginMode = true;
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleMode = document.getElementById('toggleMode');
const authForm = document.getElementById('authForm');
const registerInputs = document.getElementById('registerInputs');

/*Observer del estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('Usuario autenticado:', user.email);
    // Aquí puedes redirigir al usuario o mostrar/ocultar elementos
    alert("Ya iniciaste sesion");
    window.location.href="../html/index.html";
    
  } else {
    console.log('Usuario no autenticado');
    // Aquí puedes mostrar el formulario de login o hacer otras acciones
    manejarUsuarioNoAutenticado();
  }
});*/



function manejarUsuarioNoAutenticado() {
  // Mostrar el formulario de autenticación
  document.getElementById('authForm').style.display = 'block';
  // Aquí puedes ocultar elementos que solo son para usuarios autenticados
}

// Cambiar entre registro e inicio de sesión
toggleMode.addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  formTitle.textContent = isLoginMode ? 'Iniciar Sesión' : 'Registro';
  submitBtn.textContent = isLoginMode ? 'Iniciar Sesión' : 'Registrarse';
  toggleMode.textContent = isLoginMode 
      ? '¿No tienes cuenta? Regístrate aquí'
      : '¿Ya tienes cuenta? Inicia sesión aquí';
  
  registerInputs.style.display = isLoginMode ? 'none' : 'block';
});

// Manejar envío del formulario
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;

  try {
    if (!isLoginMode) {
      const confirmPass = document.getElementById('confirmPass').value;
      const username = document.getElementById('username').value;

      if (password !== confirmPass) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (!username) {
        alert('Por favor ingresa un nombre de usuario');
        return;
      }

      // Registro
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await db.collection('users').doc(userCredential.user.uid).set({
        username: username,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('Usuario registrado correctamente');
    } else {
      // Inicio de sesión
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href="../html/index.html";
      console.log('Sesión iniciada correctamente');
    }
    
    authForm.reset();
  } catch (error) {
    console.error('Error:', error.message);
    alert(error.message);
  }
});



// Función para verificar el estado actual de la sesión
function verificarSesion() {
  const user = auth.currentUser;
  if (user) {
    console.log('Usuario actual:', user.email);
    return true;
  } else {
    console.log('No hay usuario autenticado');
    return false;
  }
}