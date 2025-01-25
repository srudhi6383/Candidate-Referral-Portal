# Candidate Referral Portal
A web-based application for managing employee referrals, built with a React frontend and Node.js/Express backend. This application allows users to login, create new referral requests, and track the status of referrals.

## Features
  - **Login Page**: Users can log in with credentials (Email and Password).
  - **Home Page**:
    - Raise a new referral request with the candidate’s details (Name, Email, Experience, Resume).
    - Display all referral candidates and their statuses.
    - Update the status of a referral (New, Evaluated, Hired, Rejected).

## Tech Stack
### Frontend:
  - React.js
  - Tailwind CSS for UI
### Backend:
  - Node.js with Express
  - MongoDB for database
  - Multer for file handling (resume upload)
### Authentication:
  - Simple email-password authentication.

## Requirements
Before running the project, make sure you have the following installed:
  - Node.js
  - MongoDB (or use a cloud MongoDB service like MongoDB Atlas)
  - npm

# Setup
## Frontend Setup
1. ## Navigate to the frontend directory:
    ```
    cd ../frontend
    ```
2. ## Install frontend dependencies:
    ```
    npm install
    ```
3. ## Run the frontend server:
    ```
    npm start
    ```
    The frontend React app will run on ```http://localhost:3000```.

## API Endpoints
1. **Login** (```POST /api/login```)
    - Request Body:
    ```
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
    - Response:
    ```
    {
      "success": true
    }
    ```
2. **Create Referral** (```POST /api/referrals```)
    - Request Body:
      ```
        {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "experience": "5 years",
          "resume": (file)   # The file must be uploaded as part of the request
        }
      ```
    - Response:
      ```
      {
        "success": true
      }
      ```
3. **Get Referrals** (```GET /api/referrals```)
     - Response:
      ```
        [
          {
            "_id": "123",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "experience": "5 years",
            "status": "New",
            "resume": "/uploads/123-resume.pdf"
          }
        ]
4. **Update Referral Status** (```PUT /api/referrals/:id```)
    - Request Body:
      ```
        {
            "status": "Evaluated"
        }
      ```
    - Response:
      ```
      {
        "success": true
      }
      ```
