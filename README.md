# 🎵 Spotify-Practice — Backend API

A production-style REST API backend for a Spotify-inspired music platform, built with **Node.js**, **Express**, and **MongoDB**. Features JWT-based authentication, role-based access control, cloud file uploads, and full music/album management.

---

## 🚀 Features

- **User Authentication** — Register, Login, Logout with JWT stored in HTTP cookies
- **Password Security** — Passwords hashed using bcrypt before storing
- **Role-Based Access Control** — `user` and `artist` roles with dedicated middleware
- **Music Upload** — Artists can upload music files via Multer + ImageKit cloud storage
- **Album Management** — Artists can create albums and link music tracks to them
- **Music & Album Retrieval** — Fetch all songs, all albums, or a specific album by ID
- **Production Architecture** — Clean separation into Controllers, Routes, Middlewares, Models, and Services

---

## 🛠️ Tech Stack

| Category           | Technology           |
| ------------------ | -------------------- |
| Runtime            | Node.js              |
| Framework          | Express.js           |
| Database           | MongoDB + Mongoose   |
| Authentication     | JSON Web Token (JWT) |
| Password Hashing   | bcryptjs             |
| File Upload        | Multer + ImageKit    |
| Cookie Handling    | cookie-parser        |
| Environment Config | dotenv               |

---

## 📁 Project Structure

```
Spotify-Practice/
├── src/
│   ├── Controllers/
│   │   ├── auth.controller.js      # Register, Login, Logout logic
│   │   └── music.controller.js     # Music & Album CRUD logic
│   ├── db/
│   │   └── db.js                   # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.middlewares.js     # JWT verification, artist auth
│   │   └── role.middleware.js      # Role-based access (user/artist)
│   ├── models/
│   │   ├── user.model.js           # User schema
│   │   ├── music.model.js          # Music schema
│   │   └── album.model.js          # Album schema
│   ├── Routes/
│   │   ├── auth.routes.js          # Auth endpoints
│   │   └── music.routes.js         # Music & Album endpoints
│   ├── services/
│   │   └── storage.services.js     # ImageKit upload logic
│   └── app.js                      # Express app setup
├── server.js                       # Entry point
├── .env                            # Environment variables
└── package.json
```

---

## 📌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint    | Description                  | Access |
| ------ | ----------- | ---------------------------- | ------ |
| POST   | `/register` | Register a new user          | Public |
| POST   | `/login`    | Login and receive JWT cookie | Public |
| POST   | `/logout`   | Clear JWT cookie             | Public |

### Music Routes — `/api/music`

| Method | Endpoint           | Description                | Access      |
| ------ | ------------------ | -------------------------- | ----------- |
| POST   | `/upload`          | Upload a music file        | Artist only |
| POST   | `/uploadAlbum`     | Create a new album         | Artist only |
| GET    | `/`                | Get all music tracks       | User/Artist |
| GET    | `/albums`          | Get all albums             | User/Artist |
| GET    | `/albums/:albumId` | Get a specific album by ID | Public      |

---

## 🗄️ Data Models

### User

```json
{
  "username": "string (unique, required)",
  "email": "string (unique, required)",
  "password": "string (hashed, required)",
  "role": "string (default: 'user')"
}
```

### Music

```json
{
  "title": "string (required)",
  "url": "string (ImageKit URL, required)",
  "artist": "ObjectId → User (required)"
}
```

### Album

```json
{
  "title": "string (required)",
  "artist": "ObjectId → User (required)",
  "musics": ["ObjectId → Music"]
}
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Spotify-Practice.git
cd Spotify-Practice
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 4. Run the server

```bash
# Development
npm run dev

# Production
npm start
```

---

## 🧪 Testing

All APIs were tested using **Postman**. Make sure to:

- Send `Content-Type: application/json` for auth routes
- Use `multipart/form-data` for file upload routes
- JWT token is automatically set as a cookie after login/register

---

## 👤 Author

**Noor Saqib**

- GitHub: https://github.com/Saqib-Noor-05/
- LinkedIn:https://www.linkedin.com/in/noor-saqib-2b7154257/

---
