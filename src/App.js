import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './component/UserList';
import CreateUser from './component/CreateUser';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      });
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    toggleModal();
  };

  // Open the delete confirmation popup with the user details
  const confirmDelete = (user) => {
    setUserToDelete(user);  // Store the selected user's details
    setIsConfirmDeleteOpen(true);
  };

  // Handle deletion of the user
  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${userToDelete.id}`);
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setIsConfirmDeleteOpen(false);
        setIsDeleteSuccessOpen(true);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>User Management Software</h1>
      <div className="button-container">
        <button className="create-user-btn" onClick={() => { setSelectedUser(null); toggleModal(); }}>
          Create User
        </button>
      </div>
   

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>X</button>
            <CreateUser
              addUser={addUser}
              updateUser={updateUser}
              closeModal={toggleModal}
              selectedUser={selectedUser}
            />
          </div>
        </div>
      )}

      <UserList users={users} handleEditUser={handleEditUser} confirmDelete={confirmDelete} />

      {/* Confirmation Modal for Deleting */}
      {isConfirmDeleteOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Do you want to delete {userToDelete.name}?</p>
            <button onClick={handleDeleteUser}>Yes</button>
            <button onClick={() => setIsConfirmDeleteOpen(false)}>No</button>
          </div>
        </div>
      )}

      {/* Success Modal after Deletion */}
      {isDeleteSuccessOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>User deleted successfully.</p>
            <button onClick={() => setIsDeleteSuccessOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
