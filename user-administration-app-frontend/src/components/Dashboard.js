import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, createUser, deleteUser } from '../services/UserService';
import UserForm from './UserForm';
import UserTable from './UserTable';
import DeleteUserForm from './DeleteUserForm';
import { clearAuthCredentials } from '../utils/api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchUsers = async (page = 0) => {
    try {
      const data = await getUsers(page);
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.pageable.pageNumber);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleCreateUser = async (user) => {
    setError('');
    try {
      await createUser(user);
      fetchUsers(currentPage);
      alert(`The user ${user.email} was created successfully`)
    } catch (error) {
      const errorResponseBody = error.response?.data.errors?.join(',\n') || error;
      const errorMessage = `User creation failed: \n${errorResponseBody}`;
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const handleDeleteUser = async (email) => {
    setError('');
    try {
      await deleteUser(email);
      fetchUsers(currentPage);
      alert(`The user ${email} was deleted successfully`)
    } catch (error) {
      const errorResponseBody = error.response?.data.errors?.join(',\n') || error;
      const errorMessage = `User deletion failed: \n${errorResponseBody}`;
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

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

      <DeleteUserForm onDelete={handleDeleteUser} />

      <br></br>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
