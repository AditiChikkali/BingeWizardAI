// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB5x-1uOMEggKbt7SLL0QvO5Q3duFurBj4',
  authDomain: 'bingewizardai.firebaseapp.com',
  projectId: 'bingewizardai',
  storageBucket: 'bingewizardai.appspot.com',
  messagingSenderId: '269999585484',
  appId: '1:269999585484:web:def18288a9e76978b1ea69',
  measurementId: 'G-YMN2DB3PWS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
