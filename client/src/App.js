import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import { AuthContext } from './components/AuthContext';
import { useContext } from 'react';

function App() {
  const { isUserAuthorized } = useContext(AuthContext);
  return (
    
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isUserAuthorized ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={isUserAuthorized ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/signup" element={isUserAuthorized ? <Navigate to="/dashboard" /> : <SignupPage />} />
        </Routes>
      </Router>
  );
}

export default App;
