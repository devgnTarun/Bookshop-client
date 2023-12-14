const express = require('express')
const {
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} = require('firebase/firestore')
const { Products } = require('../config')

const authorizeToken = require('../authentication/authorization')
const router = express.Router()

router.get('/get-all-books', authorizeToken, async (req, res) => {
  try {
    // Retrieve all user documents from Firestore

    const snapshot = await getDocs(Products)
    const books = []

    snapshot.forEach((doc) => {
      const userData = {
        id: doc.id,
        author: doc.data().author || null,
        genre: doc.data().genre || null,
        src: doc.data().image || null,
        title: doc.data().title || null,
        price: doc.data().price || null,
        // Add any other relevant fields you want to include
      }
      books.push(userData)
    })
    res.status(200).json(books)
  } catch (error) {
    console.error('Error getting all users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
