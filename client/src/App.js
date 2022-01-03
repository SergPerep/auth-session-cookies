import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import HomePage from './components/pages/HomePage';

function App() {
  return (
      <main>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
      </main>
  );
}

export default App;
