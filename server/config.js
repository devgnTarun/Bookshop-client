// Import necessary Firebase modules
const admin = require('firebase-admin');
const serviceAccount = require('./keys.json');
const books = require('./products.json')
const { addDoc } = require('firebase-admin/firestore')
// Load environment variables from a .env file
require('dotenv').config()

// Firebase configuration with API key and other credentials
// const firebaseConfig = {
//   // apiKey: process.env.FIREBASE_API_KEY,
//   // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   // projectId: process.env.FIREBASE_PROJECT_ID,
//   // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   // appId: process.env.FIREBASE_APP_ID,
//   apiKey: "AIzaSyDJrMshUls4nZUHEOXRRzyxYKtrio9bAaA",
//   authDomain: "books-site-client.firebaseapp.com",
//   projectId: "books-site-client",
//   storageBucket: "books-site-client.appspot.com",
//   messagingSenderId: "91985732838",
//   appId: "1:91985732838:web:d89fd82546c7ae31178727",
//   measurementId: "G-7NZ1ZGXG7C"
// }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://books-site-client-default-rtdb.firebaseio.com"
});

// Get a Firestore instance from the initialized Firebase app
const db = admin.firestore();

// Create a reference to the 'Users' collection in Firestore
const Users = db.collection('users')
const Products = db.collection('products')

async function addDefaultBooks() {
  try {
    // Check if the collection is empty
    const booksSnapshot = await Products.doc();
    if (booksSnapshot) {
      // If empty, add default books

      for (const book of books) {
        await Products.doc().set(book);
      }
      console.log('Default books added to Firestore.');
    } else {
      console.log('Books collection is not empty. Skipping default books addition.');
    }
  } catch (error) {
    console.error('Error adding default books:', error);
  }
}


// Run the script
addDefaultBooks()

// Export the 'Users' collection reference for use in other files or modules
module.exports = { Users, Products }
