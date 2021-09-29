import firebase from 'firebase/app/'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyByLXfhMTa8zK8_ZnG4U2ZoMaW7rm72ktk",
    authDomain: "cochat-9d956.firebaseapp.com",
    projectId: "cochat-9d956",
    storageBucket: "cochat-9d956.appspot.com",
    messagingSenderId: "222064290691",
    appId: "1:222064290691:web:37af7fac26822584ce64b6",
    measurementId: "G-5QQMDCPBWW"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics()
const auth = firebase.auth()
const db = firebase.firestore()

// auth.useEmulator('http://localhost:9099')
// if(window.location.hostname === 'localhost')
// {
//     db.useEmulator('localhost','8080')
// }
export {auth, db}
export default firebase