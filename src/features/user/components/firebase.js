import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBGiIQUlPh_JZWF6mfAy_TosFvNDYPZX74",
    authDomain: "verify-otp-f3fbe.firebaseapp.com",
    projectId: "verify-otp-f3fbe",
    storageBucket: "verify-otp-f3fbe.appspot.com",
    messagingSenderId: "170353264009",
    appId: "1:170353264009:web:f3fa069c7d92136951cd58",
    measurementId: "G-LYS1QRCCR7"
};


firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebase ;