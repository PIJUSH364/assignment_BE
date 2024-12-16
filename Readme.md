# My Work

This is a Node.js project designed for managing contacts. This guide provides step-by-step instructions to set up, configure, and run the application in your environment.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version 20 or higher.
- **npm**: Comes with Node.js installation.
- **PostgreSQL**: Ensure a PostgreSQL database is running.
- **TypeScript**: Installed globally (optional).

## Environment Variables

Create an `.env` file in the root of the project and copy the following configuration into it:

```
# Deployment Environment
port=8001
dbUsername=contact_mangement_user
dbUserPassword=
dbName=contact_mangement
poolDbName=postgres
dbHost=
dbPort=5432
dbDialect=postgres
dbPoolMax=250
dbPoolMin=2
dbPoolAquire=60000
dbPoolIdle=5000
```

### Notes:

- Replace `dbHost` with the hostname or IP address of your PostgreSQL server.
- Replace `dbUserPassword` with the actual password for the database user.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/PIJUSH364/contact_management.git
cd my-work
```

Install the dependencies:

```bash
npm install
```

## Scripts

The following scripts are available in the project:

- **Development Mode**: Automatically restarts the server on file changes.
  ```bash
  npm run development
  ```
- **Build**: Compiles TypeScript files into JavaScript in the `build` directory.
  ```bash
  npm run build
  ```
- **Start**: Runs the compiled application.
  ```bash
  npm start
  ```
- **Postinstall**: Automatically builds the project after dependencies are installed.

## Running the Application

1. Ensure the `.env` file is properly configured.
2. Run the application in development mode:
   ```bash
   npm run development
   ```
3. To build and start the application in production:
   ```bash
   npm run build
   npm start
   ```

## Database Configuration

This project uses PostgreSQL with Sequelize as the ORM. Ensure your database is set up and matches the configuration in your `.env` file. Run the following commands to set up the database using Sequelize CLI:

### Database Setup

1. Install Sequelize CLI globally if not installed:
   ```bash
   npm install -g sequelize-cli
   ```
2. Create the database:
   ```bash
   npx sequelize-cli db:create
   ```

## Project Structure

- **src/**: Contains the TypeScript source code.
- **build/**: Contains the compiled JavaScript code.
- **.env**: Stores environment variables.
- **package.json**: Contains scripts and dependency definitions.
