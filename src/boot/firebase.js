// import something here
import * as firebase from 'firebase/app'

require('firebase/auth')
require('firebase/firestore')
require('firebase/functions')
require('firebase/storage')


// "async" is optional
var firebaseConfig = {
    apiKey: "AIzaSyBrWYahCzt3pBtLAXiPsLgKjYy7XhThkTo",
    authDomain: "prevenapp-5a803.firebaseapp.com",
    databaseURL: "https://prevenapp-5a803.firebaseio.com",
    projectId: "prevenapp-5a803",
    storageBucket: "prevenapp-5a803.appspot.com",
    messagingSenderId: "53960835934",
    appId: "1:53960835934:web:a37d3beeaf98dcd22905cf",
    measurementId: "G-R29YXDRFRL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions  = firebase.functions()

export { firebase, auth, db, storage, functions }
