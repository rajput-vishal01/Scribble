# 📒 Scribble

*A Full-Stack Note-Taking App Built with the MERN Stack* ✨

## 📝 About

**Scribble** is a modern note-taking application built with the MERN stack. It serves as a great project for beginners to learn and implement real-world full-stack web development concepts.

🌐 **Live Demo**: [scribble.projects.askvishal.in](https://scribble.projects.askvishal.in)

## 🚀 Features

- **MERN Stack** – Built with MongoDB, Express.js, React.js, and Node.js
- **User Authentication** – Secure login and signup using bcryptjs and JSON Web Tokens
- **Notes CRUD** – Create, read, update, and delete notes with title and content
- **RESTful API** – Clean and well-structured backend API with proper HTTP methods
- **State Management** – Zustand for efficient and lightweight state management
- **Responsive Design** – Fully responsive UI for mobile, tablet, and desktop
- **Production Ready** – Includes instructions for deployment and environment setup

## 🔧 Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/rajput-vishal01/Scribble
cd scribble
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Start another terminal & navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🌐 API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /signup` - Register a new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /check` - Check authentication status (Protected)

### Notes Routes (`/api/v1/notes`)
All notes routes are protected and require authentication.

- `GET /` - Get all notes for authenticated user
- `POST /` - Create a new note
- `GET /:id` - Get a specific note by ID
- `PUT /:id` - Update a note by ID
- `DELETE /:id` - Delete a note by ID


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 👨‍💻 Author

**Vishal**
- Website: [askvishal.in](https://askvishal.in)
- Project Live: [scribble.projects.askvishal.in](https://scribble.projects.askvishal.in)

## 🙏 Acknowledgments

- Built as a learning project for MERN stack development
- Perfect for beginners looking to understand full-stack web development
- Demonstrates real-world application architecture and best practices

---

⭐ **Star this repo if you found it helpful!**