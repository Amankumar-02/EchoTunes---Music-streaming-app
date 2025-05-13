# 🎵 EchoTunes - Full-Stack Music Streaming Platform

EchoTunes is a comprehensive music streaming application with advanced audio controls, personalized playlist management, and role-based user access.

## 🌟 Project Overview

EchoTunes delivers a feature-rich music streaming experience with secure authentication, role-based access control, personalized playlists, and responsive audio controls built from scratch. The platform provides both user and admin functionalities for a complete music management ecosystem.

## 🚀 Project Repositories

- [Frontend]: [EchoTunes Frontend](https://github.com/Amankumar-02/EchoTunes-Frontend-UI)
- [Backend]: [EchoTunes Backend](https://github.com/Amankumar-02/EchoTunes-Backend)

---

## ✨ Key Features

### 🔐 Authentication & Security

- JWT-based secure authentication
- Password hashing with bcrypt
- Role-based access control (Admin, User)
- Secure token management

### 🎧 Music Experience

- Advanced audio controls (play, pause, next, previous)
- Custom volume control and seek bar
- Song download capabilities for authenticated users
- Personalized playlist management

### 👑 Admin Features

- User management (block/unblock users)
- Content management (add/remove music and playlists)
- Platform metrics and analytics
- Complete administrative control

### 👤 User Features

- Create and manage personal playlists
- Add songs to playlists
- Download favorite songs locally
- Edit dashboard details
- Browse and discover new music

### 🔍 Search & Navigation

- Refined search functionality for music and playlists
- Breadcrumb navigation for clear route tracking
- User-friendly interface design
- Real-time notifications with react-toastify

---

## 📦 Tech Stack

### Frontend

- **React.js** - UI Library
- **Vite** - Build Tool
- **Redux & Redux Toolkit** - State Management
- **React Router** - Navigation
- **Axios** - HTTP Requests
- **Remixicon** - Icon Library
- **Tailwind CSS** - Styling
- **React-Toastify** - Notifications

### Backend

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Media Storage
- **Multer** - File Upload
- **bcrypt** - Password Encryption
- **EJS** - Template Engine
- **Nodemon** - Development Server

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/docs/) (local or Atlas)
- [Cloudinary](https://cloudinary.com/documentation) (account for media storage)
- npm or Yarn
- [Git](https://git-scm.com/)
- Frontend running at: `http://localhost:5173`
- Backend running at: `http://localhost:3000`

---

## 📦 Full Project Setup

```bash
1. Clone Repositories

bash

# Clone Frontend
git clone https://github.com/Amankumar-02/EchoTunes-Frontend-UI
cd frontend

# Clone Backend
git clone https://github.com/Amankumar-02/EchoTunes-Backend
cd backend

2. Backend Setup

I. Install dependencies:

bash
cd backend
npm install

II. Create .env file:

PORT = 3000
MONGODB_URL = "Your mongodb cluster url"
EXPRESS_SESSION_SECRET = "your express session secret"
ACCESS_TOKEN_SECRET = ""
ACCESS_TOKEN_EXPIRY = 1d
REFRESH_TOKEN_SECRET = ""
REFRESH_TOKEN_EXPIRY = 10d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional
CORS_ORIGIN=http://localhost:5173, *

III. Start backend server:

bash
npm start
# or
yarn start

3. Frontend Setup

I. Install dependencies:

bash
cd frontend
npm install

II. Create .env file:



Start frontend development server:

bash
npm run dev
```

---

### 📋 Main API Endpoints

### 🔐 Authentication
* `POST /auth/userregister` - Register a new user
* `POST /auth/userlogin` - Login and receive JWT
* `GET /auth/userlogout` - Logout and clear JWT
* `POST /auth/userRefresh-token` - Refresh authentication token

### 👤 User Management
* `GET /auth/loginUserDets` - Get current user profile details
* `PATCH /auth/updatedetails` - Update user profile
* `PATCH /auth/changeCurrent` - Update password
* `PATCH /auth/updateCoverImage` - Update cover image
<!-- * `PATCH /api/v1/users` - Admin: Get all users -->
<!-- * `PATCH /api/v1/users/:userId/block` - Admin: Block/unblock user -->

### 🎵 Music Management
* `POST /media/addMedia` - Admin: Upload a new song
* `GET /media/songs` - Get all available songs
* `GET /media/albums` - Get all available albums
* `GET /media/find/:songId` - Get album songs by album ID
* `GET /media/updateSongs` - Force reset the songs database
<!-- * `PATCH /media/updateSong/:songId` - Admin: Update song details -->
<!-- * `DELETE /media/deleteSong/:songId` - Admin: Delete a song -->

### 📂 Playlist Management
* `POST /savedPlaylist/soloCreatePlaylist` - Create a new playlist
* `POST /savedPlaylist/createPlaylist` - Create playlist / add song to playlist
* `GET /savedPlaylist/allPlaylists` - Get all user created playlists
* `GET /savedPlaylist/playlist/:playlistId` - Get user playlist songs by playlist ID
* `POST /savedPlaylist/removeSong` - Remove song from playlist
* `PATCH /savedPlaylist/editPlaylistName` - Update playlist details
* `DELETE /savedPlaylist/deletePlaylist` - Delete a playlist

### 🔍 Search
* `POST /media/findSong` - Search songs and playlists

<!-- ### 📊 Admin Dashboard
* `GET /api/v1/admin/stats` - Get platform statistics
* `GET /api/v1/admin/songs` - Get all songs with management options
* `GET /api/v1/admin/users` - Get all users with management options -->

### 🧩 Middleware / Utils
* `verifyJWT` — Verifies JWT for protected routes
* `isAdmin` — Verifies user has admin role
* `upload` — Handles file uploads with Multer
* `asyncHandler` — Manages asynchronous route handlers
* `responseHandler` — Centralized response handling
* `errorHandler` — Centralized error handling
* `uploadOnCloudinary` — Handles media uploading with cloudinary
* `deleteOnCloudinary` — Delete media from cloudinary

---

## 🌈 Frontend Navigation Flow

### 👦🏻 User Features

- **Home** - Discover trending and recommended songs
- **Search** - Find songs and playlists
- **Albums** - Access your saved music
- **Playlists** - View and manage your playlists
- **Downloads** - Access your downloaded songs

### 👨🏻‍💼 Admin Features

- **Dashboard** - Overview of platform metrics
- **User Management** - Block/unblock users
- **Content Management** - Add/remove music and playlists
- **Analytics** - Track platform usage

### 🎧 Audio Player Features

- **Playback Controls** - Play, pause, skip forward/backward
- **Volume Control** - Adjust and mute audio
- **Seek Bar** - Navigate through the song
- **Song Information** - Display current track details
- **Queue Management** - View and control upcoming songs
- **Persistent Player** - Audio continues while navigating the app

## 🚧 Future Roadmap

 - Collaborative playlists
 - Social sharing features
 - Artist accounts and profiles
 - Advanced recommendation engine
 - Offline mode functionality

## 📱 Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

---

## 🤝 Contributing

- Fork the repository
- Create your feature branch
- Commit your changes
- Push to the branch
- Open a Pull Request

---

# Happy Listening! 🎵✨
