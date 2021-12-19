import firebase from 'firebase/compat/app';
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyA9RCcK3n2kqkxxa-MX2gNM0z7AVR1OsOs",
    authDomain: "react-contact-2754d.firebaseapp.com",
    databaseURL: "https://react-contact-2754d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-contact-2754d",
    storageBucket: "react-contact-2754d.appspot.com",
    messagingSenderId: "1001757185759",
    appId: "1:1001757185759:web:e29c7ec7d954cc927dbb6a"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();