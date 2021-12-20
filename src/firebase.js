import firebase from 'firebase/compat/app';
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyDuPn81g-Rw8xZrPoelFfFBUkKiRPtD6oA",
  authDomain: "technikaltest.firebaseapp.com",
  databaseURL: "https://technikaltest-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "technikaltest",
  storageBucket: "technikaltest.appspot.com",
  messagingSenderId: "678175034948",
  appId: "1:678175034948:web:7bc7dff04f6ff719f27611",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
