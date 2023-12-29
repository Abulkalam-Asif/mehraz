import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBJ_AmK8SVIY0s6sgV5W1kZVn8R923rRk0",
	authDomain: "mehraz-e8261.firebaseapp.com",
	projectId: "mehraz-e8261",
	storageBucket: "mehraz-e8261.appspot.com",
	messagingSenderId: "902392423874",
	appId: "1:902392423874:web:26c9218264d682ed0b625b",
	measurementId: "G-Y6VCNRRXKB",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage=getStorage(app);
export { db, auth,storage };