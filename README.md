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

*   Docker installed. You can download it from [Docker Desktop](https://www.docker.com/products/docker-desktop/).
*   Node.js (version >= 16) and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
*   MySQL server installed and running.

## Getting Started

### Clone the repository
```
git clone <repository-url>
cd user-dashboard
```

### Option 1: Docker Setup (Recommended)
This is the easiest way to get the application running.

1. **Install Docker:** Follow the instructions on [Docker Desktop](https://www.docker.com/products/docker-desktop/) to install Docker on your system.

2.  **Modify `docker-compose.yml`:** Open the `docker-compose.yml` file in the root of the `user-dashboard` directory.  Locate the `db` and `backend` services and update the environment variables with your desired database credentials.

    **Example `docker-compose.yml` (snippet - please adapt to your complete file!):**

    ```yaml
    version: "3.8"

    services:
      db:
        image: mysql:8.0
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: your_db_root_password  # **MODIFY THIS**
          MYSQL_DATABASE: your_database_name      # **MODIFY THIS**
          MYSQL_ROOT_USER: your_db_root_user           # **MODIFY THIS**
        ports:
          - "3306:3306"  # Expose for external access (optional, usually only for debugging)
        expose:
          - 3306
        volumes:
          - db_data:/var/lib/mysql  # Persist data
        networks:
          - fullstack-network

      backend:
        build:
          context: .
          dockerfile: backend/Dockerfile
        ports:
          - "4000:4000"
        environment:
          NODE_ENV: development
          DB_HOST: db         # Important:  Use the service name 'db'
          DB_PORT: 3306
          DB_USER: your_db_user      # **MODIFY THIS** Use the MySQL user or root user
          DB_PASSWORD: your_db_password # **MODIFY THIS** Use the MySQL password or root password
          DB_NAME: your_database_name    # **MODIFY THIS** Use the MySQL database name

    volumes:
      db_data:

    networks:
      fullstack-network:
    ```

    *   **`db` service:**  Change `your_db_root_password`, `your_database_name`, and `your_db_root_user`  to your desired MySQL root credentials and database name. These are the credentials the MySQL server inside the container will use.
    *   **`backend` service:** Change `your_db_user`, `your_db_password`, and `your_database_name`.  These are the credentials the *backend application* uses to connect to the MySQL database. **Important:** `DB_HOST` should be `db`. This is the name Docker uses to resolve the `db` service. The backend uses this to connect to the database container.
    *   **Important DB_Host:**  Note the line `DB_HOST: db`.  This is critical for Docker to resolve the database container's address.  Do *not* use `localhost` or `127.0.0.1` here.

3.  **Run Docker Compose:** Navigate to the root directory of the `docker-compose.yml` file (which should be in the `user-dashboard` directory) and run the following command:

    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images and start the containers defined in the `docker-compose.yml` file.

4.  **Access the application:** Once the containers are running, you can access the application by launching the following URL in your web browser:

    ```
    http://localhost:4000
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

3.  **Create .env file and add below configs:**

    Create a `.env` file in the root directory and add the following configurations:

    ```
    NEXT_PUBLIC_BACKEND_URL: http://backend:4000  # Or the port you specified in the `.env.development` file in backend
    httpValue: http
    ```

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will typically run on `http://localhost:3000` (or the available port specified in the terminal). Open with your browser to see the results.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
