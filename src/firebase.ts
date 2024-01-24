// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBVHpMyo9eq7oqmN-3j-2u0g5LL4UFTpx0',
    authDomain: 'calm-sea-f7711.firebaseapp.com',
    projectId: 'calm-sea-f7711',
    storageBucket: 'calm-sea-f7711.appspot.com',
    messagingSenderId: '135052104767',
    appId: '1:135052104767:web:c338cd43737f078345148a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
