import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBBNPRpPOqzdghGdi-pO4hd0VN-J1P9Jbk',
  authDomain: 'miniblog-7e530.firebaseapp.com',
  projectId: 'miniblog-7e530',
  storageBucket: 'miniblog-7e530.appspot.com',
  messagingSenderId: '301859990683',
  appId: '1:301859990683:web:4dcef6797c8c3523a46a3e',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
