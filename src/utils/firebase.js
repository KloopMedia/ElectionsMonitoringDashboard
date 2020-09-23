import firebase from 'firebase';

const firebaseConfig = {
apiKey: "AIzaSyCCAhvWFvwuxDUXZ4aV-FhB_Dj-lp_frCw",
    authDomain: "electionsmonitor-5d008.firebaseapp.com",
    databaseURL: "https://electionsmonitor-5d008.firebaseio.com",
    projectId: "electionsmonitor-5d008",
    storageBucket: "electionsmonitor-5d008.appspot.com",
    messagingSenderId: "145410178875",
    appId: "1:145410178875:web:6cf434df68d3c65062811e",
    measurementId: "G-EXC8T9QXES"
};
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
	firebase.auth().signInWithPopup(provider);
};
export default firebase;
