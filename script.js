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

// OBSERWATOR STANU LOGOWANIA
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Zalogowany - pokazujemy statystyki z Users/UID
        document.getElementById("game-status").style.display = "inline-block";
        document.getElementById("login-container").style.display = "none";
        
        firebase.database().ref('Users/' + user.uid + '/swag').on('value', (snapshot) => {
            document.getElementById('coins').innerText = snapshot.val() || 0;
        });
    } else {
        // Niezalogowany - pokazujemy login
        document.getElementById("game-status").style.display = "none";
        document.getElementById("login-container").style.display = "block";
    }
});

function togglePass() {
    var x = document.getElementById("passField");
    x.type = (x.type === "password") ? "text" : "password";
}

function stworzKonto() {
    const email = document.getElementById("emailField").value;
    const pass = document.getElementById("passField").value;

    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch((error) => alert("Error: " + error.message));
}
