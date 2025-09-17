# 🌐 nanoURL  
*A modern URL Shortening Service built with MERN Stack*  

[![Made with React](https://img.shields.io/badge/Frontend-React-blue?logo=react)]()  
[![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)]()  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?logo=mongodb)]()  
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-purple?logo=render)]()  

🔗 **Live Demo:** [nanoURL on Render]()  

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




