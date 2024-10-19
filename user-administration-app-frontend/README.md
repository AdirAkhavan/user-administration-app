# User Administration Frontend

## Project Overview
This frontend application is built with React and serves as the user interface for managing users within the user administration app.\
It communicates with the backend via RESTful API calls to perform CRUD operations on user data.

## Modules
### App.js
The main component that sets up the router for the application.\
It defines the routes for the login page and the dashboard, rendering the appropriate components based on the current URL.

### Login.js
Handles user authentication. It presents a form for entering the username and password.\
Upon successful login, it stores the credentials in local storage and navigates to the dashboard.

### Dashboard.js
The central component for user management. It integrates user-related functionalities, including creating and deleting users, displaying user data, and navigating through pages of the users table.\
It uses the useUserManagement custom hook to manage user data and handle operations.

### useUserManagement.js
A custom React hook that encapsulates the logic for fetching, creating, deleting, and refreshing user data.\
It manages the state of users, error messages, and pagination, providing a clean interface for the Dashboard component.

### UserServices.js
Contains the API service functions for interacting with the backend. It includes methods for fetching the user list, creating a new user, and deleting an existing user.

### api.js
Sets up the Axios instance for making HTTP requests to the backend. It configures the base URL and adds authorization headers using Basic Authentication. It also includes functions to manage authentication credentials stored in local storage.

### constants.js
Defines constants used throughout the application, including server host, port, base URL for API requests, and pagination settings.

### UserForm.js
A form component for creating new users. It handles input for user details and submits the data to create a new user.

### UserTable.js
Displays a paginated list of users in a table format. It includes functionality to delete users.

### DeleteUserForm.js
A form component that allows users to delete an existing user by entering their email address.