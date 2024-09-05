import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = ({ users, handleEditUser, confirmDelete }) => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setFetchedUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const allUsers = [...fetchedUsers, ...users];

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div >
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => confirmDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
