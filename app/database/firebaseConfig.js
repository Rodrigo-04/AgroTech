import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyDp4FZx5tWM-9fjgLFiUCan6g_ZdxPvu3s',
  authDomain: 'agrotech-85573.firebaseapp.com',
  databaseURL: 'https://agrotech-85573-default-rtdb.firebaseio.com',
  projectId: 'agrotech-85573',
  storageBucket: 'agrotech-85573.firebasestorage.app',
  messagingSenderId: '214779146980',
  appId: '1:214779146980:web:a803cccdb77254fe4ff2f1',
  measurementId: "G-DBCDKF0E7L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };

export { analytics };