import React, { useState } from 'react';

const DeleteUserForm = ({ onDelete }) => {
  const [emailToDelete, setEmailToDelete] = useState('');
  const [error, setError] = useState('');

  const handleDeleteByEmail = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await onDelete(emailToDelete);
      setEmailToDelete('');
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h3>Delete User by Email</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleDeleteByEmail}>
        <input
          type="email"
          placeholder="Enter user email to delete"
          value={emailToDelete}
          onChange={(e) => setEmailToDelete(e.target.value.toLowerCase())}
          required
        />
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
};

export default DeleteUserForm;
