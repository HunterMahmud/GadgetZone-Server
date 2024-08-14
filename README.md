# GadgetZone Server

**Visit the live site:** [ThriveFit](link will be here).

[Client Side Repository](https://github.com/HunterMahmud/repo)

## Description

This is the server-side code for the GadgetZone application. It is built with Node.js, Express, and MongoDB, and uses JSON Web Tokens (JWT) for authentication.

## Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB instance (local or remote).

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/HunterMahmud/repo.git
   cd gadgetzone-server
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   DB_USER=your_mongodb_user
   DB_PASS=your_mongodb_password
   SECRET=your_jwt_secret
   ```

   Replace `your_mongodb_user`, `your_mongodb_password`, and `your_jwt_secret` with your actual values.

4. **Start the server**:

   ```sh
   npm run dev
   ```

   The server should now be running and accessible at `http://localhost:your_port_number`.

## Scripts

- `dev`: Starts the server using `nodemon index.js`.

## Author

- Hasan Al Mahmud
