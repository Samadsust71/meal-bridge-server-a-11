## Live URL

Access the live application here: [MealBridge Live Site](https://meal-bridge.web.app)

# MealBridge Backend  

The backend for MealBridge, a community-driven platform aimed at food sharing and surplus reduction. This repository handles the server-side logic, API endpoints, and database integration for the application.

---

## Purpose

The backend is responsible for managing the application's business logic, authentication, and secure communication with the database. It ensures a seamless and reliable experience for users interacting with the MealBridge platform.

---

## Key Features

- **Authentication and Authorization**:  
  User authentication with JSON Web Tokens (JWT) for secure session management.  
- **RESTful API**:  
  Clean and scalable endpoints for handling user data, food requests, and donations.  
- **Cross-Origin Resource Sharing (CORS)**:  
  Enables secure communication between the frontend and backend.  
- **Environment Configuration**:  
  Manage sensitive configuration details securely using `dotenv`.  
- **MongoDB Integration**:  
  A robust and scalable NoSQL database for managing user and donation data.  
- **Middleware Implementation**:  
  Efficient handling of cookies, parsing requests, and authentication checks.  

---

## Dependencies

The following npm packages are used to build the backend:  

- **cookie-parser**: Parse HTTP cookies and manage sessions effectively.  
- **cors**: Enable secure cross-origin requests from the frontend.  
- **dotenv**: Load environment variables from a `.env` file.  
- **express**: Fast, unopinionated web framework for building APIs.  
- **jsonwebtoken**: Generate and verify JSON Web Tokens for secure authentication.  
- **mongodb**: MongoDB driver for integrating with the database.  

---

