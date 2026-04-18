import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/login-page/LoginPage.tsx';
import HomePage from './pages/home-page/HomePage.tsx';
import GlobalSpinner from './components/GlobalSpinner.tsx';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/register-page/RegisterPage.tsx';
import EmailPage from './pages/email-page/EmailPage.tsx';
import VerifyEmailToken from './pages/verfiy-email-token/VerfiyEmailToken.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

export default function App() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  return (
    <>
      <GlobalSpinner />
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute><HomePage /></PrivateRoute>}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />}
        />
        <Route path="/email-verification" element={<EmailPage />} />
        <Route path="/verify" element={<VerifyEmailToken />} />
      </Routes>
    </>
  );
}
