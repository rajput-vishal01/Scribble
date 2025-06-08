import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import DetailNote from './pages/DetailNote'
import Auth from './pages/Auth'

// Mock auth check 
const isAuthenticated = () => {
  return document.cookie.includes("jwt-scribble"); // basic check using cookie
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" replace />;
}

// Auth Route Component (redirects to home if already logged in)
const AuthRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
}

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
      <Route path="/note/:id" element={<ProtectedRoute><DetailNote /></ProtectedRoute>} />
      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  );
};

export default App;