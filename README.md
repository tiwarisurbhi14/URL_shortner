# 🌐 nanoURL  
*A modern URL Shortening Service built with MERN Stack*  

[![Made with React](https://img.shields.io/badge/Frontend-React-blue?logo=react)]()  
[![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)]()  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?logo=mongodb)]()  
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-purple?logo=render)]()  

🔗 **Live Demo:** [nanoURL on Render](https://url-shortner-frontend-1vhd.onrender.com)  

---

## 📖 Table of Contents  
1. [Introduction](#-introduction)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Architecture](#-architecture)  
5. [API Documentation](#-api-documentation)  
6. [Database Schema](#-database-schema)  
7. [Security](#-security)  
8. [Deployment](#-deployment)  
9. [Future Scope](#-future-scope)  
10. [Setup Instructions](#-setup-instructions)  
11. [What I Learned](#-what-i-learned)  
12. [Author](#-author)  

---

## 🚀 Introduction  
**nanoURL** is a full-stack URL shortener that converts long, messy links into compact, shareable URLs.  
It supports:  
- 🔒 Authentication (JWT + bcrypt)  
- 🎯 Custom aliases  
- ⏰ Automatic expiry (TTL index)  
- ⚡ Fast redirects  

This project was built to practice **full-stack development** and showcase production-ready design.  

---

## ✨ Features  
✔️ Shorten URLs with random/custom aliases  
✔️ Automatic expiry using MongoDB TTL indexes  
✔️ JWT-based user authentication  
✔️ Secure password hashing with bcrypt  
✔️ Prevent alias collisions with DB checks  
✔️ Deployed on Render (live project)  
⚡ Planned: Analytics (clicks, location, device type)  
⚡ Planned: Redis caching for faster redirects  

---

## 🛠 Tech Stack  

**Frontend**: React, Tailwind CSS  
**Backend**: Node.js, Express  
**Database**: MongoDB (TTL Indexes)  
**Authentication**: JWT, bcrypt  
**Deployment**: Render + GitHub CI/CD  

---

## 🏗 Architecture  



```mermaid
flowchart TD
  A[Frontend: React + Tailwind] --> B[Backend: Node.js + Express]
  B --> C[(MongoDB with TTL Indexes)]
  B --> D[Authentication: JWT + bcrypt]
  B --> E[Deployment: Render]
````

---

## 📑 API Documentation

### 🔗 Shorten URL

**POST** `/api/shorten`

**Request:**

```json
{
  "originalUrl": "https://www.longurl.com/some/path",
  "customAlias": "myLink"
}
```

```

✅ I added the missing **closing triple backticks** (`\`\`\``) after the Mermaid block.  
✅ Also added a separator line (`---`) to make sections clear.  

Would you like me to now **rebuild your entire README with this fix applied everywhere**, so you can copy it in one go without debugging again?
```


**Response:**

```json
{
  "shortUrl": "https://nanoURL.io/myLink"
}
```

---

### ↪ Redirect URL

**GET** `/:alias` → Redirects to original URL

---

### 👤 Authentication

* **Register** → `POST /api/auth/register`
* **Login** → `POST /api/auth/login` → Returns JWT
* **Protected routes** → Require `Authorization: Bearer <token>`

---

## 🗄 Database Schema

**Url Model:**

* `originalUrl`: String
* `shortUrl`: String
* `alias`: String
* `createdAt`: Date (TTL expiry after 1 hour)

**User Model:**

* `username`: String
* `password`: String (bcrypt hashed)
* `createdAt`: Date

---

## 🔒 Security

* ✅ Passwords stored securely with bcrypt
* ✅ JWT tokens for stateless authentication
* ✅ Alias uniqueness check before DB insert
* ✅ Environment variables for secrets
* ✅ Input validation against XSS & SQL Injection

---

## 🚀 Deployment

* Hosted on **Render** with GitHub auto-deploy
* Frontend & Backend deployed separately
* Environment variables securely stored in Render dashboard

---

## 📈 Future Scope

* 📊 Add analytics (clicks, devices, geolocation)
* ⚡ Implement Redis caching for faster redirects
* ⛔ Add rate limiting for abuse prevention
* 🌐 Support custom domains
* 🔔 Notify users before link expiry

---

## ▶️ Setup Instructions

### Prerequisites

* Node.js installed
* MongoDB URI (Atlas or Local)

### Run Locally

```bash
# Clone repo
git clone https://github.com/yourusername/nanoURL.git

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd ../frontend
npm install
npm start
```

---

## 🧑‍💻 What I Learned

* Building REST APIs with Express
* Using MongoDB TTL indexes for automatic expiry
* Implementing JWT authentication & bcrypt security
* Deploying full-stack apps with Render
* Handling alias collisions & edge cases

---

## 🙋 Author

👩‍💻 **Surbhi Tiwari**
*Engineering Student | Full-Stack Enthusiast*

🔗 [LinkedIn](https://www.linkedin.com/in/surbhi-tiwari-98b201246/) | [GitHub](https://github.com/tiwarisurbhi14/URL_shortner)




