import { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser } from '../services/UserService';

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 0) => {
    setError('');
    try {
      const data = await getUsers(page);
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.pageable.pageNumber);
    } catch (error) {
      const errorMessage = `Error fetching users: ${error}`;
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const handleCreateUser = async (user) => {
    setError('');
    try {
      await createUser(user);
      fetchUsers(currentPage);
      alert(`User ${user.email} was created successfully`);
    } catch (error) {
      const errorResponseBody = error.response?.data.errors?.join('\n') || 'Error creating user';
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
      alert(`User ${email} was deleted successfully`);
    } catch (error) {
      const errorResponseBody = error.response?.data.errors?.join('\n') || 'Error deleting user';
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

  const handleRefresh = () => {
    fetchUsers(currentPage);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return {
    users,
    error,
    currentPage,
    totalPages,
    handleCreateUser,
    handleDeleteUser,
    handlePageChange,
    handleRefresh,
  };
};

export default useUserManagement;
