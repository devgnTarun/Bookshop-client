const express = require('express')
const admin = require('firebase-admin')
const {
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
  getDocs,
} = require('firebase-admin/firestore')
const jwt = require('jsonwebtoken')
const userSchema = require('../validation/userSchema')
const loginSchema = require('../validation/loginSchema')
const { Users } = require('../config')
const bcrypt = require('bcrypt')
const authorizeToken = require('../authentication/authorization')
const router = express.Router()
require('dotenv').config()

// POST request to add a user
router.post('/create', async (req, res) => {
  try {
    const userData = req.body
    console.log('Create User Method called...')
    // Validate user data
    const { error } = userSchema.validate(userData)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashedPassword

    // Ensure 'Users' is a valid CollectionReference
    if (!(Users instanceof admin.firestore.CollectionReference)) {
      return res.status(500).json({ error: 'Invalid Firestore reference' });
    }

    // Store the user data in Firestore
    const userDocRef = Users.doc(); // Creates a reference to a new document with a generated ID
    await userDocRef.set(userData); // Set the data in the document

    console.log('User Added with ID:', userDocRef.id)
    res.status(200).json({ msg: 'User Added' })
  } catch (error) {
    console.error('Error adding user:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST request to handle user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    // Validate login dataW
    const { error } = loginSchema.validate({ email, password })
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    // Create a query against the collection
    const queryRef = query(Users, where('email', '==', email))
    const querySnapshot = await getDocs(queryRef)

    if (querySnapshot.empty) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    let user = {}
    querySnapshot.forEach((doc) => {
      user = doc.data()
    })

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token with a short expiration time (e.g., 5 minutes)
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
      },
    )
    console.log('Access Token : ', accessToken)
    // Respond with the generated token
    res.json({ accessToken })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// GET request to get all users with authorization
router.get('/get-all-users', authorizeToken, async (req, res) => {
  try {
    // Retrieve all user documents from Firestore

    const snapshot = await getDocs(Users)
    const allUsersData = []

    snapshot.forEach((doc) => {
      const userData = {
        id: doc.id,
        firstName: doc.data().firstName || null,
        email: doc.data().email || null,
        lastName: doc.data().lastName || null,
        // Add any other relevant fields you want to include
      }
      allUsersData.push(userData)
      console.log(userData)
    })

    res.status(200).json(allUsersData)
  } catch (error) {
    console.error('Error getting all users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// GET request to get a user with authorization
router.get('/get/:userId', authorizeToken, async (req, res) => {
  try {
    const userId = req.params.userId
    const userDoc = await getDoc(doc(Users, userId))

    if (!userDoc.exists()) {
      res.status(404).json({ error: 'User not found' })
    } else {
      // Extract relevant user data and respond
      const userData = {
        username: userDoc.data().username,
        id: userDoc.id,
      }
      res.status(200).json(userData)
    }
  } catch (error) {
    console.error('Error getting user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// PUT request to update a user with authorization
router.put('/update', authorizeToken, async (req, res) => {
  try {
    // const userId = req.params.userId
    const newData = req.body

    // Validate the updated data
    // const { error } = userSchema.validate(newData)
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message })
    // }

    // Update the user data in Firestore
    await updateDoc(doc(Users, newData.id), newData)

    res.status(200).json({ msg: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// DELETE request to delete a user with authorization
router.delete('/delete/:userId', authorizeToken, async (req, res) => {
  try {
    const userId = req.params.userId

    // Check if the user exists
    const userDoc = await getDoc(doc(Users, userId))
    if (userDoc == null) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Delete the user data from Firestore
    await deleteDoc(doc(Users, userId))

    res.status(200).json({ msg: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Export the router for use in other files
module.exports = router
