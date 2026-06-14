const firebaseConfig = {
    apiKey: "AIzaSyAwON7Zg2NOVzzz9M8WSewXxzSbDs6Hbbo",
    authDomain: "sagwa-81d84.firebaseapp.com",
    databaseURL: "https://sagwa-81d84-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sagwa-81d84",
    storageBucket: "sagwa-81d84.appspot.com",
    messagingSenderId: "474638621860",
    appId: "1:474638621860:web:c55eea29fc4f30b740da31"
};

firebase.initializeApp(firebaseConfig);

// Pobieranie danych z bazy
const db = firebase.database();
const playerRef = db.ref('Players/Player1/Swag'); // Sprawdź czy ścieżka się zgadza!

playerRef.on('value', (snapshot) => {
    const val = snapshot.val();
    document.getElementById('coins').innerText = val !== null ? val : 0;
});
