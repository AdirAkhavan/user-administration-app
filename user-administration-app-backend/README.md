# User Administration Backend

## Project Overview
The backend of this user administration application is built with Java and Spring Boot, providing a RESTful API for user management.\
It supports user creation, retrieval, and deletion.

## Classes
### AppUser
Entity class representing a user in the application, with fields for email, first name, last name, and password.\
The email address is used as the user's ID in the database.

### The Controller-Service-Repository pattern
Promotes the separation of concerns by dividing the application logic into three distinct layers.\
Each layer has a specific responsibility, making the code easier to manage, test, and scale. 

1. Controller Layer (UserController):\
Handles HTTP requests related to user creation, retrieval, and deletion.\
It acts as the intermediary between clients and the service layer, validating requests and returning appropriate responses.

2. Service Layer (UserService):\
Contains the core business logic, processing user management operations such as password encryption and delegating data access to the repository layer.

3. Repository Layer (UserRepository):\
Abstracts data persistence by providing CRUD operations for the AppUser entity, encapsulating the logic for querying, saving, and updating data, and communicating directly with the database.

### UserAdministrationAppBackendApplication
Main application class that bootstraps the Spring Boot application.

### UserValidator
Validates user creation requests. Currently only ensures email uniqueness before proceeding with user creation.

### SecurityConfig
Configures security settings for the application, including CORS and basic authentication with an in-memory user.

### UserCreationDTO
Data Transfer Object for user creation requests, ensuring that input data is validated.\
Helps decouple the API contract from the domain model, improving flexibility.

### UserDTO
Data Transfer Object representing user information returned in responses, omitting sensitive data such as the password.\
It enhances security and decouples the internal data model from the API.

### UserMapper
Utility class for mapping between UserCreationDTO, AppUser, and UserDTO objects, facilitating data conversion.

### GlobalExceptionHandler
Handles exceptions globally, providing meaningful error responses.\
This promotes cleaner code by reducing error-handling logic in controllers.

### ErrorResponse
Class for structuring error responses sent to clients, encapsulating a list of error messages.\
Improves error clarity and client-server communication.

### UserNotFoundException
Custom exception thrown when a user is not found by their email address.

### EmailAlreadyExistsException
Custom exception thrown when attempting to create a user with an email that already exists in the system.
