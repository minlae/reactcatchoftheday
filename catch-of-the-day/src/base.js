import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCOizv8q1HO1UgKyUNqZTyXygUQWUKW3Fs",
    authDomain: "catch-of-the-day---milena-2.firebaseapp.com",
    databaseURL: "https://catch-of-the-day---milena-2.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

//this is a default export
export default base;