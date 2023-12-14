import { useState, useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Cookies from 'js-cookie'

import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
  const initialUsers = useState([])
  const [token, setToken] = useState(Cookies.get('authToken') || '')
  const [users, setUsers] = useState(null)
  const [updateData, setUpdateData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    id: '',
  })
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          'http://localhost:4000/auth/get-all-users',
          {
            headers: {
              Authorization: `${token}`, // Replace YOUR_AUTH_TOKEN with the actual token
            },
          },
        )
        setUsers(response.data)
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error.replace(/"/g, '')
          : error.message

        console.error(`Error: ${errorMessage}`)
      }
    }

    fetchData()
  }, [token, users])

  const handleEdit = (userId) => {
    setEditingUser(userId)
    users.map((user) => {
      if (user.id === userId) {
        setUpdateData(user)
      }
    })
  }

  const handleUpdate = (e) => {
    const { name, value } = e.target
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      const response = await Axios.put(
        'http://localhost:4000/auth/update',
        updateData,
        {
          headers: {
            Authorization: `${token}`, // Use Bearer before the token
            'Content-Type': 'application/json', // Specify content type if you're sending JSON
          },
        },
      )

      console.log('User updated successfully:', response.data)
    } catch (error) {
      console.log('Errors')
      const errorMessage = error.response
        ? error.response.data.error.replace(/"/g, '')
        : error.message

      console.error(`Error updating user: ${errorMessage}`)
    }
  }

  const handleDelete = async (itemId) => {
    try {
      const response = await Axios.delete(
        `http://localhost:4000/auth/delete/${itemId}`,
        {
          headers: {
            Authorization: `${token}`, // Replace with your actual token
          },
        },
      )
      console.log('User deleted successfully:', response.data)
      // Add logic to update state or refresh data if needed
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="container mt-5 min-vh-100">
        <h2>User List</h2>
        <ul className="list-group">
          {users == null ? (
            <div>Loading</div>
          ) : (
            users.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {editingUser === user.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={updateData.firstName}
                      onChange={handleUpdate}
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={updateData.lastName}
                      onChange={handleUpdate}
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={updateData.email}
                      onChange={handleUpdate}
                    />
                  </>
                ) : (
                  <>
                    <div className="card-text">
                      <div className="mb-3">
                        <strong>User Id:</strong> {user.id}
                      </div>
                      <div className="mb-3">
                        <strong>First Name:</strong> {user.firstName}
                      </div>
                      <div className="mb-3">
                        <strong>Last Name:</strong> {user.lastName}
                      </div>
                      <div>
                        <strong>Email:</strong> {user.email}
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <button
                    className="btn btn-warning m-2"
                    onClick={() =>
                      editingUser === user.id
                        ? handleSave(user.id)
                        : handleEdit(user.id)
                    }
                  >
                    {editingUser === user.id ? 'Save' : 'Edit'}
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
