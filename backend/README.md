# 🎵 EchoTunes - Backend

A robust backend for a music streaming platform with advanced user management, content delivery, and authentication features.

## 🌟 Features

- **User Authentication** - Secure signup/login with JWT and bcrypt
- **Role-Based Access Control** - Admin and User roles with different permissions
- **Music Management** - Upload, store, and serve audio content
- **Playlist Operations** - Create, edit, and manage music playlists
- **User Management** - Admin capabilities to block/unblock users
- **Cloud Integration** - Optimized media handling with Cloudinary
- **Download Support** - Secure endpoints for authorized song downloads
- **RESTful API** - Comprehensive endpoints for frontend integration

---

## 📦 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Cloud storage for audio files
- **CORS** - Cross-Origin Resource Sharing
- **EJS** - Embedded JavaScript templates
- **Multer** - Middleware for handling multipart/form-data
- **Dotenv** - Environment variable management
- **Nodemon** - Development server with auto-restart

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/docs/) (local or Atlas)
- [Cloudinary](https://cloudinary.com/documentation) (account for media storage)
- [Git](https://git-scm.com/)
- Frontend running at: `http://localhost:5173`

---

## 📦 Clone the Repository

```bash
bash
git clone https://github.com/Amankumar-02/EchoTunes-Backend
cd EchoTunes-Backend

🚀 Installation

1. Install dependencies:

bash
npm install
# or
yarn install

2. Create a .env file in the project root:

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

3. Start the development server:

bash
npm run dev
# or
yarn dev

4. For production:

bash
npm start
# or
yarn start
```

---

## 📋 API Endpoints

### 🔐 Auth
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

### 🎵 Songs
* `POST /media/addMedia` - Admin: Upload a new song
* `GET /media/songs` - Get all available songs
* `GET /media/albums` - Get all available albums
* `GET /media/find/:songId` - Get album songs by album ID
* `GET /media/updateSongs` - Force reset the songs database
<!-- * `PATCH /media/updateSong/:songId` - Admin: Update song details -->
<!-- * `DELETE /media/deleteSong/:songId` - Admin: Delete a song -->

### 📂 Playlists
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

### Middleware / Utils
* `verifyJWT` — Verifies JWT for protected routes
* `isAdmin` — Verifies user has admin role
* `upload` — Handles file uploads with Multer
* `asyncHandler` — Manages asynchronous route handlers
* `responseHandler` — Centralized response handling
* `errorHandler` — Centralized error handling
* `uploadOnCloudinary` — Handles media uploading with cloudinary
* `deleteOnCloudinary` — Delete media from cloudinary

---

## 🔧 Available Scripts

- `npm start` - Run development server with nodemon
- `npm run dev` - Start production server
- `npm run seed` - Seed database with initial data

## 🤝 Contributing

- Fork the repository
- Create your feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add some amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request
