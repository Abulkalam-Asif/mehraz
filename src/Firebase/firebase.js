import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
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
// connectFirestoreEmulator(db, "127.0.0.1", 8080);

const auth = getAuth(app);

const storage = getStorage(app);
// connectStorageEmulator(storage, "127.0.0.1", 9199);

export { db, auth, storage };
