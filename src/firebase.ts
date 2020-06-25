import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/firestore';
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_APPID,
    appId: process.env.REACT_APP_FIREBASE_APPID
});

const db = firebase.firestore();

export default firebase.database();

export { db, app };