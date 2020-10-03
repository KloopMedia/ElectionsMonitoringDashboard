import firebase from 'firebase';

// const firebaseConfig = {
// apiKey: "AIzaSyCCAhvWFvwuxDUXZ4aV-FhB_Dj-lp_frCw",
//     authDomain: "electionsmonitor-5d008.firebaseapp.com",
//     databaseURL: "https://electionsmonitor-5d008.firebaseio.com",
//     projectId: "electionsmonitor-5d008",
//     storageBucket: "electionsmonitor-5d008.appspot.com",
//     messagingSenderId: "145410178875",
//     appId: "1:145410178875:web:6cf434df68d3c65062811e",
//     measurementId: "G-EXC8T9QXES"
// };TODO
const firebaseConfig = {
apiKey: "AIzaSyBj2q_xJTPtfgtRGz-SN8_NjVYQ9qtAzIw",
    authDomain: "electionsmonitorstaging.firebaseapp.com",
    databaseURL: "https://electionsmonitorstaging.firebaseio.com",
    projectId: "electionsmonitorstaging",
    storageBucket: "electionsmonitorstaging.appspot.com",
    messagingSenderId: "901357005980",
    appId: "1:901357005980:web:2006a62aa812492d489159",
    measurementId: "G-69DFTZBTQ7"
};
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
	firebase.auth().signInWithPopup(provider);
};
export default firebase;
