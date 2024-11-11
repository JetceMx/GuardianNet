  // Tu configuración de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyA4dc03UGk65xBhZHwGZIhJP43yRoF_S9Q",
    authDomain: "seminario-37282.firebaseapp.com",
    projectId: "seminario-37282",
    storageBucket: "seminario-37282.firebasestorage.app", // Corregido storageBucket
    messagingSenderId: "622727262882",
    appId: "1:622727262882:web:2d99e55f5922f8f3f19dfb"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
// Y luego usar:
const db = firebase.firestore();