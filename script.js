// Twoja konfiguracja (zostaje bez zmian)
const firebaseConfig = {
    apiKey: "AIzaSyAwON7Zg2NOVzzz9M8WSewXxzSbDs6Hbbo",
    authDomain: "sagwa-81d84.firebaseapp.com",
    databaseURL: "https://sagwa-81d84-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sagwa-81d84",
    storageBucket: "sagwa-81d84.appspot.com",
    messagingSenderId: "474638621860",
    appId: "1:474638621860:web:c55eea29fc4f30b740da31"
};

// Inicjalizacja
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// UWAGA: Twoja baza ma folder "Players" (wielka litera!)
// Celujemy w "Player1" i jego pole "Swag"
const playerRef = db.ref('Players/Player1/Swag');

// Nasłuchiwanie
playerRef.on('value', (snapshot) => {
    const val = snapshot.val();
    // Aktualizujemy element o id="coins" (zmieniliśmy tylko logikę, HTML zostaje)
    document.getElementById('coins').innerText = val !== null ? val : 0;
});