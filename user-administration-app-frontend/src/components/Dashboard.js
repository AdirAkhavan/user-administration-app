import './Dashboard.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import UserTable from './UserTable';
import DeleteUserForm from './DeleteUserForm';
import { clearAuthCredentials } from '../utils/api';
import useUserManagement from '../hooks/useUserManagement';

const Dashboard = () => {
  const {
    users,
    error,
    currentPage,
    totalPages,
    handleCreateUser,
    handleDeleteUser,
    handlePageChange,
    handleRefresh,
  } = useUserManagement();

  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthCredentials();
    navigate('/');
  };

  return (
    <div>
      <h2>User Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <UserForm onSubmit={handleCreateUser} />

      <UserTable users={users} onDelete={handleDeleteUser} />

      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <span> Page {currentPage + 1} of {totalPages} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>

      <br />

      <button onClick={handleRefresh}>Refresh Table</button>

      <br />

      <DeleteUserForm onDelete={handleDeleteUser} />

      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
