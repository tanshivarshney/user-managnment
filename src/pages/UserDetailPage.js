import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetailPage = () => {
  const { id } = useParams();  // Getting the user ID from the URL params
  const [user, setUser] = useState(null);  // User data state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetching user details when the component is mounted
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching user details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;  // Show loading spinner while fetching data
  if (error) return <p>{error}</p>;  // Show error message in case of failure

  return (
    <div>
      {user && (
        <div>
          <h2>User Details</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Address:</strong> {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
