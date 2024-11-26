// Inicialización de Firebase (asegúrate de que esto ya esté en tu página)
const firebaseConfig = {
    apiKey: "AIzaSyA4YU252wQT1ez4g-gOQcYRrsEQHXtlx9Y",
    authDomain: "guardiannet-d6cd5.firebaseapp.com",
    projectId: "guardiannet-d6cd5",
    storageBucket: "guardiannet-d6cd5.firebasestorage.app",
    messagingSenderId: "430964208603",
    appId: "1:430964208603:web:8d74b64188bbcd9b11edfe"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/// Función para cerrar sesión
function cerrarSesion() {
    auth.signOut()
        .then(() => {
            console.log('Sesión cerrada exitosamente');
           
        })
        .catch((error) => {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión: ' + error.message);
        });
}

// Agregar el evento al botón de cerrar sesión
document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);

// Observer del estado de autenticación
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('Usuario autenticado:', user.email);
      // Aquí puedes redirigir al usuario o mostrar/ocultar elementos
      
    } else {
      console.log('Usuario no autenticado');
      // Aquí puedes mostrar el formulario de login o hacer otras acciones
      manejarUsuarioNoAutenticado();
    }
  });

