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

// Obserwator stanu użytkownika
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'inline-block';
        
        // Pobieramy dane TYLKO zalogowanego użytkownika
        firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.getElementById('coins').innerText = "Swag: " + data.swag;
                document.getElementById('username').innerText = data.displayName;
            }
        });
    } else {
        document.getElementById('auth-container').style.display = 'inline-block';
        document.getElementById('game-container').style.display = 'none';
    }
});

function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(e => alert(e.message));
}

function register() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass).then((cred) => {
        // Inicjalizacja danych nowego użytkownika
        firebase.database().ref('Users/' + cred.user.uid).set({
            displayName: email.split('@')[0],
            swag: 0,
            level: 1
        });
    }).catch(e => alert(e.message));
}

function logout() {
    firebase.auth().signOut();
}
