import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUTVXvFSXXFlokeNK_gGJ4GUFHH9KplnY",
  authDomain: "practice-2540.firebaseapp.com",
  projectId: "practice-2540",
  storageBucket: "practice-2540.appspot.com",
  messagingSenderId: "340236512453",
  appId: "1:340236512453:web:81e68d3a764ee3776794ac"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

const SendData = (obj, colName) => {
 
    addDoc(collection(db, colName), obj)
      .then((res) => {
        resolve("data send to db successfully");
      })
      .catch((err) => {
        console.log();(err);
        
      }); 
};

export { SendData };
