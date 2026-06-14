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
// --- ADD THIS AT THE VERY BOTTOM OF YOUR script.js FILE ---

function togglePass() {
    var x = document.getElementById("passField");
    x.type = (x.type === "password") ? "text" : "password";
}

function stworzKonto() {
    const email = document.getElementById("emailField").value;
    const pass = document.getElementById("passField").value;

    if (!email || !pass) {
        alert("Please enter email and password!");
        return;
    }

    // Create user account in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        const uid = userCredential.user.uid;
        
        // Generate Unique ID: SGA + 4 random digits + 4 random letters
        const idSGA = "SGA" + Math.floor(1000 + Math.random() * 9000) + 
                      Array.from({length: 4}, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

        // Generate Retro Username
        const retroPrefixes = ["Retro", "Pixel", "Arcade", "Cyber", "Mega"];
        const retroSuffixes = ["Hero", "Master", "Player", "Boss", "Sage"];
        const username = retroPrefixes[Math.floor(Math.random()*retroPrefixes.length)] + "_" + 
                         retroSuffixes[Math.floor(Math.random()*retroSuffixes.length)];

        // Prepare user data for Realtime Database
        const userData = {
            displayName: username,
            username: username,
            uniqueID: idSGA,
            swag: 0,
            gold: 0,
            level: 1,
            createdAt: new Date().toISOString()
        };

        // Save data to Firebase Realtime Database
        firebase.database().ref('Users/' + uid).set(userData)
        .then(() => {
            alert("Account created successfully! Welcome, " + username);
        });
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
}
