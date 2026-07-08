# 🎓 SkillStream

<p align="center">
  <h3 align="center">Learn. Create. Grow.</h3>
  <p align="center">
    A production-ready backend for a modern learning platform built with Node.js, Express, MongoDB, and Cloud Services.
  </p>
</p>

---

## 🚀 Overview

**SkillStream** is a scalable backend powering an educational video platform where creators can publish structured courses, upload learning content, interact with learners, and monitor channel performance through an analytics dashboard.

Unlike traditional video-sharing platforms, SkillStream is designed around **structured learning**, allowing educators to organize videos into courses while providing learners with an engaging and organized educational experience.

The project follows industry-standard backend practices including secure authentication, modular architecture, cloud media storage, aggregation pipelines, request validation, and centralized error handling.

---

# ✨ Current Status

> **Backend Version:** ✅ V1 Complete

| Module              | Status |
| ------------------- | ------ |
| Authentication      | ✅      |
| User Management     | ✅      |
| Video Module        | ✅      |
| Comments            | ✅      |
| Likes               | ✅      |
| Subscriptions       | ✅      |
| Course Management   | ✅      |
| Channel Updates     | ✅      |
| Dashboard Analytics | ✅      |
| Cloud Storage       | ✅      |
| Validation Layer    | ✅      |

Frontend development is the next milestone.

---

# 🌟 Features

## 🔐 Authentication & Authorization

* Secure User Registration
* User Login & Logout
* JWT Access Token Authentication
* Refresh Token Rotation
* HTTP-only Secure Cookies
* Password Hashing using bcrypt
* Current User Session
* Change Password
* Protected Routes
* Ownership-based Authorization

---

## 👤 User Management

* User Profiles
* Avatar Upload
* Cover Image Upload
* Profile Updates
* Channel Information
* Watch History
* Creator Channels

---

## 🎥 Video Management

* Upload Educational Videos
* Publish / Unpublish Videos
* Update Video Details
* Delete Videos
* Video Search
* Pagination
* View Tracking
* Thumbnail Support
* Cloud Storage Integration
* Metadata Management

---

## 📚 Course Management

SkillStream organizes learning through structured courses.

Features include:

* Create Course
* Update Course
* Delete Course
* Course Visibility
* Add Videos to Course
* Remove Videos from Course
* Search Courses
* Retrieve Individual Courses
* Retrieve Creator Courses

---

## 💬 Community Features

### Comments

* Create Comment
* Edit Comment
* Delete Comment
* Paginated Comments

### Likes

* Like Videos
* Like Comments
* Toggle Like
* Like Counters

### Subscriptions

* Subscribe to Creators
* Unsubscribe
* Subscriber Count
* Creator Following System

### Channel Updates

Creators can communicate directly with learners through channel updates.

* Create Update
* Edit Update
* Delete Update
* View Creator Updates

---

# 📊 Dashboard Analytics

The dashboard provides creators with detailed insights into their content performance.

### Channel Analytics

* Subscriber Count
* New Subscribers (Last 30 Days)
* Creator Profile Information

### Video Analytics

* Total Videos
* Total Views
* Total Likes
* Total Comments
* Average Likes per Video
* Average Comments per Video
* Average Video Duration
* Most Viewed Video Statistics
* Highest Engagement Statistics

### Recent Activity

* Latest Uploaded Videos
* Latest Courses
* Latest Comments

### Top Content

* Top Performing Videos
* View-based Ranking

---

# 🏗️ Backend Architecture

SkillStream follows a production-oriented architecture.

```text
                Client
                   │
                   ▼
              Express Router
                   │
        ┌──────────┴──────────┐
        │                     │
 Authentication         Validation
        │                     │
        └──────────┬──────────┘
                   ▼
             Controllers
                   │
                   ▼
              Business Logic
                   │
                   ▼
              MongoDB Models
                   │
                   ▼
               MongoDB Atlas
```

---

# 🛠️ Technology Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

## Cloud Services

* Cloudinary
* Cloudflare R2

## File Upload

* Multer

## Development

* Git
* GitHub
* Postman
* ESLint
* Prettier

---

# ☁️ Cloud Infrastructure

### Images

* Cloudinary

### Videos

* Cloudflare R2

### Upload Pipeline

* Multer Middleware
* Temporary File Cleanup
* Secure Upload Utilities

---

# 🔒 Security Features

* JWT Authentication
* Refresh Token Rotation
* Secure HTTP-only Cookies
* Password Hashing
* Ownership Validation
* ObjectId Validation
* Request Validation
* Protected Routes
* File Validation
* Centralized Error Handling

---

# ⚙️ Engineering Concepts Demonstrated

* RESTful API Design
* MVC Architecture
* MongoDB Aggregation Framework
* Authentication & Authorization
* Refresh Token Strategy
* Cloud Storage Integration
* Pagination
* Compound Indexes
* Middleware Architecture
* Async Error Handling
* Centralized API Responses
* Validation Layer
* Database Relationships
* Modular Project Structure

---

# 📁 Project Structure

```text
Backend
│
├── config/
├── constants/
├── controllers/
│   ├── auth/
│   ├── user/
│   ├── video/
│   ├── comment/
│   ├── like/
│   ├── subscription/
│   ├── course/
│   ├── channelUpdate/
│   └── dashboard/
│
├── db/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validators/
├── app.js
└── index.js
```

---

# 🗃️ Database Models

* User
* Video
* Comment
* Like
* Subscription
* Course
* Channel Update
* Watch History

---

# 🚀 API Highlights

* Authentication APIs
* User APIs
* Video APIs
* Comment APIs
* Like APIs
* Subscription APIs
* Course APIs
* Channel Update APIs
* Dashboard APIs

---

# 📈 MongoDB Aggregation

SkillStream leverages MongoDB's Aggregation Framework for advanced analytics.

Implemented aggregations include:

* Creator Dashboard
* Subscriber Analytics
* Video Statistics
* Engagement Metrics
* Recent Activity
* Top Performing Videos

---

# 📦 Installation

```bash
git clone https://github.com/yourusername/SkillStream.git

cd SkillStream

npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

---

# ▶️ Run Locally

```bash
npm run dev
```

---

# 📮 API Documentation

Complete API documentation is available in the included Postman collection.

Replace this with your public Postman documentation URL.

---

# 🛣️ Roadmap

## ✅ Version 1 — Backend Foundation

* Authentication
* User Management
* Video Module
* Comments
* Likes
* Subscriptions
* Courses
* Channel Updates
* Dashboard Analytics
* Cloud Storage
* Aggregation Pipelines

---

## 🚧 Version 2 — Frontend

* React Frontend
* Responsive Design
* Course Pages
* Creator Dashboard UI
* Video Player
* Authentication Pages
* User Profiles

---

## 🔮 Version 3 — Smart Learning

* AI Recommendations
* AI Notes
* Semantic Search
* Video Transcripts
* Learning Paths
* Personalized Suggestions

---

## 🧠 Version 4 — AI Learning Assistant

* RAG Pipeline
* Chat with Courses
* Ask Questions from Videos
* Timestamp-Based Answers
* AI Mentor

---

## 💻 Version 5 — Interactive Learning

* Coding Exercises
* Online Compiler
* Assignments
* Progress Tracking
* Certificates
* Leaderboards

---

## 🌍 Version 6 — Platform Expansion

* Live Classes
* Real-time Chat
* Notifications
* Mobile Application
* Organizations
* Public API
* Admin Dashboard

---

# 🎯 Why SkillStream?

SkillStream was built to demonstrate production-grade backend engineering rather than basic CRUD development.

The project showcases:

* Clean Architecture
* Secure Authentication
* Modular Design
* Cloud Integration
* Aggregation Pipelines
* Scalable APIs
* Industry-standard Backend Practices

It serves as both a real-world educational platform and a portfolio project demonstrating backend engineering skills.

---

# 👨‍💻 Author

**Shreeyansh Sahu**

Computer Science Student | Backend Developer | MERN Stack Enthusiast

Built with a focus on scalable architecture, clean code, and production-ready backend engineering.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub. It helps support the project and motivates future development.
