# User Dashboard Project - README

This project is a full-stack application featuring a user dashboard with CRUD (Create, Read, Update, Delete) operations. The backend is built with Node.js and the frontend is built with Next.js.

## Project Overview

This application provides a user interface for managing user data. It allows users to:

*   **Create** new user entries.
*   **Read** existing user details.
*   **Update** user information.
*   **Delete** user entries.

The Next.js frontend interacts with the Node.js backend API to perform these operations.  The backend is responsible for data storage, retrieval, and manipulation, while the frontend provides a user-friendly interface for interacting with the data.

## Project Structure

The project has the following directory structure:

user-dashboard/
├── backend/ # Node.js backend application
└── frontend-ui/ # Next.js frontend application

## Prerequisites

*   Node.js (version >= 16) and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
*   MySQL server installed and running.

## Getting Started

### Clone the repository

    ```bash
    git clone <repository-url>
    cd user-dashboard
    ```

### Backend setup and running

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```
    This command will install all the necessary packages listed in the `package.json` file.

3.  **Create the database:**

    *   Connect to your MySQL server using a MySQL client (e.g., MySQL Workbench).
    *   Execute the following SQL query to create the database:

    ```sql
    CREATE DATABASE your_database_name;
    ```
    Replace `your_database_name` with your desired database name.

4.  **Configure environment variables:**

    *   Create a `.env.development` file in the `backend` directory (root directory of the backend).
    *   Add the following variables:

        ```
        NODE_ENV = development
        PORT=4000  # Or any other available port
        DB_HOST = your_db_host  # e.g., localhost or 127.0.0.1
        DB_USER = your_db_user
        DB_NAME = your_database_name  # The name you chose in step 3
        DB_PASSWORD = your_db_password
        ```

    *   Replace `your_db_host`, `your_db_user`, `your_database_name` and `your_db_password` with the actual credentials for your database connection.  Ensure the user specified in `DB_USER` has the necessary permissions to access and modify the database.

5.  **Start the server:**

    ```bash
    npm run start
    ```
    This will start the backend server. The server will typically run on `http://localhost:4000` (or the port you specified in the `.env.development` file).

### Frontend Setup and Running

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend-ui
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`. Open with your browser to see the results.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.