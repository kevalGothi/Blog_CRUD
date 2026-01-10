# 📝 BlogPlus — MERN Blog Platform

🔗 **Live Client:** https://blogplus-by-keval.vercel.app  
🔗 **Backend API:** On Render  

---

## 📌 Overview

**BlogPlus** is a full-stack MERN blog application that allows users to register, authenticate, and manage blog posts through a clean and responsive interface.  
The project focuses on practical backend development, REST APIs, authentication, database design, and real-world deployment using modern web technologies.

This application is built as an end-to-end system to demonstrate full-stack development skills rather than a tutorial-based demo.

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- Protected routes
- Create, edit, and delete blog posts
- Persistent data storage with MongoDB
- React frontend with API integration
- Environment-based configuration
- Fully deployed frontend and backend

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 🧱 Application Architecture

- React frontend communicates with backend via REST APIs
- Backend handles authentication, authorization, and business logic
- JWT middleware protects private routes
- MongoDB stores user and blog data
- Environment variables are used for secure configuration

---

## 🔐 Authentication Flow (High Level)

1. User registers or logs in
2. Backend validates credentials and issues a JWT
3. Token is stored on the client
4. Protected routes verify the token using middleware
5. Authorized users can perform CRUD operations

---

## 📦 Local Setup

```bash
# clone repository
git clone https://github.com/kevalGothi/Blog_CRUD.git

# frontend
cd client
npm install
npm run dev

# backend
cd api
npm install
npm start
````

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=10000
```

---

## 🚧 Work in Progress / Planned Features

The following features are planned and currently under development:

- **Comments on blog posts**
- **Follow / unfollow bloggers**
- **Topic-wise blogs**

  * Tech
  * Movies
  * Other categories
- **Social sharing**

  * Share blog posts on Twitter (X)

These enhancements will improve user interaction, content discovery, and social reach.

---

## 🧠 Development Notes

The project emphasizes understanding of backend architecture, authentication flow, debugging, and deployment.
Modern development tools were used to improve productivity, while all architectural decisions, integrations, and deployments were handled with full ownership and understanding of the codebase.

---

## 📈 Future Enhancements

* Pagination and search
* UI animations (GSAP)
* Improved UI with component libraries
* TypeScript migration

---

## 👤 Author

**Keval Gothi / ME**
MCA Student | Full-Stack Developer

LinkedIn: [https://linkedin.com/in/kevalgothi](https://linkedin.com/in/kevalgothi)




