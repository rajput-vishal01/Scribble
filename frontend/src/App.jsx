import { Routes, Route, Navigate } from 'react-router';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import DetailNote from './pages/DetailNote';
import Auth from './pages/Auth';
import { useAuthStore } from './store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/auth" replace />;
};

const AuthRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? <Navigate to="/" replace /> : children;
};

const App = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/create" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
    <Route path="/note/:id" element={<ProtectedRoute><DetailNote /></ProtectedRoute>} />
    <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
