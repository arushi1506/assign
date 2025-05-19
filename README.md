# Digital Wallet System

A secure platform for managing virtual cash transactions with fraud detection capabilities.

## Overview

This Digital Wallet System is a robust backend application that enables users to register, manage virtual cash, and perform secure transfers between accounts. The system implements comprehensive transaction processing with built-in fraud detection mechanisms to identify suspicious activities.

## Features

### Core Functionality
- **User Authentication & Session Management**
  - Secure registration and login with password hashing
  - JWT token-based authentication
  - Protected endpoints via authentication middleware

- **Wallet Operations**
  - Deposit and withdraw virtual cash
  - Transfer funds between users
  - Complete transaction history tracking
  - Multiple currency support (bonus feature)

- **Transaction Processing & Validation**
  - Atomic transactions to ensure data integrity
  - Comprehensive validations to prevent overdrafts and invalid transfers
  - Transaction rollback capabilities

- **Fraud Detection System**
  - Rule-based detection for suspicious patterns:
    - Rapid succession of transfers
    - Unusually large withdrawals
    - Anomalous transaction patterns
  - Flagging mechanism for potential fraud

- **Administrative Dashboard & Reporting**
  - View flagged suspicious transactions
  - Generate balance reports across users
  - Identify top users by balance or activity

### Bonus Features
- Daily scheduled fraud scan jobs
- Soft-delete functionality for accounts and transactions
- Mock email alert system for suspicious transactions

## Technical Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger
- **Testing**: Jest

## API Documentation

The API documentation is available via Swagger at `/api-docs` when the server is running.

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/digital-wallet-system.git
   cd digital-wallet-system
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/digitalwallet
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=1d
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. The server will be running at `http://localhost:3000`

## Project Structure

```
digital-wallet/
├── app.js
├── .env
├── package.json
├── README.md
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── walletController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── fraudDetection.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   └── Wallet.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── walletRoutes.js
│   │   └── adminRoutes.js
│   ├── swagger/
│   │   └── swagger.js


```
## Testing

Run tests using the following command:

```
npm test
```

## Deployment

For production deployment:

```
npm run build
npm start
```

