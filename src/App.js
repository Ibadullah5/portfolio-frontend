import './App.css';
import { Route, Routes,BrowserRouter as Router} from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import ExtraInfoPage from './pages/ExtraInfoPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';
import SearchedUser from './pages/SearchedUser';
import ChangePassword from './pages/ChangePassword'
import React from 'react';

function App() {
  return (
    <>
    <Router>
      <div>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/complete-signup" element={<ExtraInfoPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit" element={<EditPage />} />
      <Route path="/profile" element={<SearchedUser />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
