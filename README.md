# Project Name: GOQii Test

This is a full-stack project for the **GOQii Developer Test**. The project involves creating a RESTful API in Core PHP for user management, with CRUD operations, and a React.js frontend that interacts with the API. The project also integrates a SQL database to store user data and utilizes Git for version control.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Database Setup](#database-setup)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [Dependencies](#dependencies)
7. [Contributing](#contributing)
8. [License](#license)

## Installation

### Prerequisites
Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (for frontend React.js app)
- [PHP](https://www.php.net/) (for backend API)
- [MySQL](https://www.mysql.com/) (or any SQL database for storing data)
- [Git](https://git-scm.com/) (for version control)

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/avinash1558/goqiitest.git
2. Navigate into the project directory:
   cd goqiitest
3. Set up the backend:
   In project directory.
   Run the PHP server:
     php -S localhost:8000
4. Set up the frontend:
   Navigate to the frontend directory:
     cd frontend
   Install dependencies:
     npm install
   Run the development server:
     npm start
   The frontend React app should now be accessible on http://localhost:3000, and the backend API will be running on http://localhost:8000.

## Usage
The React app will allow you to view and manage users (add, edit, delete).
The backend PHP API exposes endpoints to manage user data.
  GET /users: Retrieve all users.
  POST /users: Add a new user.
  PUT /users/{id}: Update an existing user.
  DELETE /users/{id}: Delete a user.

  Example API Request
  To add a new user via the API (assuming you're using Postman or similar):
  POST http://localhost:8000/users
    Content-Type: application/json

    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "dob": "1990-01-01"
    }

## Database Setup

### Database Configuration

1. Create a new MySQL database (e.g., `goqiitest`):
   
   ```sql ```
   CREATE DATABASE goqiitest;

2. After creating the database, create a table for storing users. Use the following SQL query to create the users table:
  ```sql ```
  CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,         -- Auto-incrementing ID
    name VARCHAR(255) NOT NULL,                    -- User name
    email VARCHAR(255) NOT NULL UNIQUE,            -- User email with unique constraint
    password VARCHAR(255) NOT NULL,                -- User password
    dob DATE NOT NULL,                             -- User date of birth
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Created timestamp
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Updated timestamp
  );

3. Make sure to update the database connection details in the PHP backend code to match your local MySQL server configuration (username, password, and database name).


## Project Structure
The project has the following structure:
goqiitest/
├── backend/                  # PHP backend folder for the API
│   ├── public/               # Public folder containing index.php and API routes
│   ├── src/                  # Source files for the backend
│   └── .gitignore            # Git ignore for backend files
├── frontend/                 # React.js frontend folder
│   ├── src/                  # React source files
│   ├── public/               # Public assets
│   └── .gitignore            # Git ignore for frontend files
├── .gitignore                # Git ignore for global files
└── README.md  

## Features
CRUD Operations: Users can be added, edited, and deleted via the frontend, with corresponding updates on the backend API.
Form Validation: Forms include validation for required fields, email format, and password strength.
Responsive UI: Built with a responsive design for easy use across devices.
Database Integration: Uses SQL (MySQL or equivalent) to store user data.
SweetAlert2: Displays alerts for user actions like adding, editing, and deleting users.

## Dependencies

### Frontend (React.js)
- **React**: JavaScript library for building user interfaces.
- **react-data-table-component**: A data table component for React.
- **SweetAlert2**: For displaying alerts with a beautiful and customizable UI.
- **axios**: To make HTTP requests to the API from the React app.

To install the required dependencies for the frontend, run:
npm install

## Contributing
1. Fork the repository
2. Create your feature branch:
   git checkout -b feature-name
3. Commit your changes:
   git commit -m "Add feature-name"
4. Push to your branch:
   git push origin feature-name
5. Open a Pull Request.

## License
With this structure, the README is enhanced, providing more detailed guidance and ensuring the required dependencies are clear to anyone setting up the project.

