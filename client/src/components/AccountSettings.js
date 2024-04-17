import React from 'react';
import axios from 'axios';
import Penguin from './Penguin';

function AccountSettings() {
  const handleDeleteAccount = async () => {
    try {
      // Make a DELETE request to delete the user account
      await axios.delete('http://127.0.0.1:5000/users/:{user_id}');
      // Handle successful deletion (e.g., redirect to login page)
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Account Settings</h1>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <Penguin />
    </div>
  );
}

export default AccountSettings;
