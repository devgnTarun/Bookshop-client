import React, { useState } from 'react'

const UserList = () => {
  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // Add more user data as needed
  ]

  const [users, setUsers] = useState(initialUsers)
  const [editingUser, setEditingUser] = useState(null)

  const handleEdit = (userId) => {
    setEditingUser(userId)
  }

  const handleUpdate = (userId, newName, newEmail) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, name: newName, email: newEmail } : user,
    )
    setUsers(updatedUsers)
    setEditingUser(null)
  }

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
    setEditingUser(null)
  }

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingUser === user.id ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={user.name}
                  onChange={(e) =>
                    handleUpdate(user.id, e.target.value, user.email)
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  value={user.email}
                  onChange={(e) =>
                    handleUpdate(user.id, user.name, e.target.value)
                  }
                />
              </>
            ) : (
              <>
                {user.name} - {user.email}
              </>
            )}
            <div>
              <button
                className="btn btn-warning mr-2"
                onClick={() =>
                  editingUser === user.id
                    ? handleUpdate(user.id, user.name, user.email)
                    : handleEdit(user.id)
                }
              >
                {editingUser === user.id ? 'Save' : 'Edit'}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
