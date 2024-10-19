import api from '../utils/api';
import {USERS_PAGE_SIZE} from '../utils/constants';

const getUsers = async (page = 0, size = USERS_PAGE_SIZE) => {
    try {
        const response = await api.get('', {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const createUser = async (userData) => {
    try {
        const response = await api.post('', userData);
        console.log("User created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const deleteUser = async (email) => {
    try {
        await api.delete(`/${email}`);
        console.log(`User with email ${email} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting user with email ${email}:`, error);
        throw error;
    }
};

export { getUsers, createUser, deleteUser };
