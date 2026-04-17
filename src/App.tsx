import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/login-page/LoginPage.tsx';
import HomePage from './pages/home-page/HomePage.tsx';
import GlobalSpinner from './components/GlobalSpinner.tsx';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  return (
    <>
      <GlobalSpinner />
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}
