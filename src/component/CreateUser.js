import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateUser.css';

const CreateUser = ({ addUser, updateUser, closeModal, selectedUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If editing a user, pre-fill the form with the selected user's data
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('All fields are required');
      return;
    }

    const user = {
      name,
      email,
      phone,
    };

    try {
      if (selectedUser) {
        // Edit mode: update user
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, user);
        updateUser(response.data);  // Update the user in the list
      } else {
        // Create mode: add new user
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
        addUser(response.data);  // Add new user to the list
      }
      closeModal();  // Close the modal after submitting the form
    } catch (error) {
      setError('Error submitting form');
    }
  };

  return (
    <div>
      <h2>{selectedUser ? 'Edit User' : 'Create New User'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">{selectedUser ? 'Update User' : 'Create User'}</button>
      </form>
    </div>
  );
};

export default CreateUser;
