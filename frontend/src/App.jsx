import { Routes, Route, Navigate } from 'react-router';
import { useEffect } from 'react';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import DetailNote from './pages/DetailNote';
import Auth from './pages/Auth';
import LoadingComponent from './components/Loading.jsx';
import { useAuthStore } from './store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();
  
  if (isCheckingAuth) {
    return <LoadingComponent />;
  }
  
  return authUser ? children : <Navigate to="/auth" replace />;
};

const AuthRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();
  
  if (isCheckingAuth) {
    return <LoadingComponent />;
  }
  
  return authUser ? <Navigate to="/" replace /> : children;
};

const App = () => {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-app">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(245,158,11,0.4)_0%,rgba(251,191,36,0.2)_30%,rgba(120,113,108,0.1)_60%,transparent_100%)]" />
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