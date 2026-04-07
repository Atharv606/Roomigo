// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYTfslHHi4YJt35BpQWDwChfPtyMxMZJs",
  authDomain: "edumate-f61bd.firebaseapp.com",
  projectId: "edumate-f61bd",
  storageBucket: "edumate-f61bd.firebasestorage.app",
  messagingSenderId: "536304996355",
  appId: "1:536304996355:web:9c8274c72455377aab3e36"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and db GLOBAL
window.auth = firebase.auth();
window.db = firebase.firestore();