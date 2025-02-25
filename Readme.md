# Backend for User Management Dashboard

## Description

This backend provides APIs for managing users, including authentication, user data retrieval, and account operations. Built with Node.js, Express.js, and Sequelize ORM for PostgreSQL.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PIJUSH364/assignment_BE.git
   ```
2. Navigate to the project directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

### Environment Variables

Set up a `.env` file in the root directory with the following content:

```env
NODE_ENV=development
PORT=4000

DB_USERNAME=postgres
DB_USER_PASSWORD=12345
DB_NAME=postgres
POOL_DB_NAME=postgres
DB_HOST=127.0.0.1

DB_PORT=5432
DB_DIALECT=postgres
DB_POOL_MAX=250
DB_POOL_MIN=2
DB_POOL_ACQUIRE=60000
DB_POOL_IDLE=5000

# JWT Configuration
JWT_SECRET=30daysvalid
```

### Sequelize Configuration

In the database configuration file, comment out the following section when running locally:

```js
// dialectOptions: {
//   ssl: {
//     require: true,
//     rejectUnauthorized: false, // For Render or other managed databases
//   },
// },
```

## Running the Project

### Development Mode

To start the backend server in development mode, run:

```sh
npm run dev
```

## Tech Stack

- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL, Sequelize (ORM)
- **UI Library:** TailwindCSS CSS Framework
- **Validation & Error Handling:** Joi for API payload validation
- **Code Structure:** Object-Oriented Programming (OOP) principles
