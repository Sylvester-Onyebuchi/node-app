# 🧾 Node.js User Auth & Post Management App

A full-featured Node.js application that allows users to register, verify their email via a code, log in, and manage their own posts. Authenticated users can view public posts from others, but only manage (create/update/delete) their own. The application uses cookies for session handling and integrates an email service to notify users during sign-up and login events.

---

## ✨ Features

- ✅ User registration with email verification via code
- 🔐 Secure login with HTTP-only cookie session
- 📧 Email service for account verification and login notifications
- ✍️ Authenticated users can:
  - Create a post
  - Update their own post
  - Delete their own post
- 👀 View all posts (from all users)
- 🧁 Cookie-based session management

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: Cookie-based session
- **Email Service**: Nodemailer (or similar)
- **Environment**: dotenv for managing environment variables

---

## 🚀 Getting Started

### 1. Clone the repository


git clone https://github.com/Sylvester-Onyebuchi/node-app.git
cd node-app

npm install
npm run dev
