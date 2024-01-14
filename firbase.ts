import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTSqa_aUyqaf3uzBu-Y7trDND5zRg9eXE",
  authDomain: "dropbox-clone-d3fff.firebaseapp.com",
  projectId: "dropbox-clone-d3fff",
  storageBucket: "dropbox-clone-d3fff.appspot.com",
  messagingSenderId: "496777153160",
  appId: "1:496777153160:web:8204768a2740ac56ba6d3d",
};

const app = getApps().length ? getApps() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
