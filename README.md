# 🔐 Secure User Authentication System

## 📌 Prodigy Infotech Internship - Task 01

## 🔍 Project Overview
A secure user authentication system built with React.js frontend and Node.js backend with MongoDB database.

## 🛠️ Technologies Used
### Frontend
- React.js
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- dotenv
- cors

## 📁 Project Structure
secure-user-authentication/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Profile.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── server/
    ├── models/
    │   └── User.js
    ├── middleware/
    │   └── auth.js
    ├── routes/
    │   └── auth.js
    ├── server.js
    └── package.json

## 🚀 API Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/auth/profile | Get user profile | Protected |
| GET | /api/auth/admin | Admin dashboard | Admin Only |

## ⚙️ Features
- ✅ User Registration
- ✅ Secure Login
- ✅ Password Hashing with bcryptjs
- ✅ JWT Token Authentication
- ✅ Protected Routes
- ✅ Role Based Access Control
- ✅ React Frontend
- ✅ REST API Backend

## 👨‍💻 Author
rajendran55764-lab - Prodigy Infotech Internship Task 01
