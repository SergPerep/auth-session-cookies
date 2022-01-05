import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import { AuthContext } from './components/AuthContext';
import { useContext } from 'react';

function App() {
  const { isUserAuthorized } = useContext(AuthContext);
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={isUserAuthorized ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={isUserAuthorized ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/signup" element={isUserAuthorized ? <Navigate to="/" /> : <SignupPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
