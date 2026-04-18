import { Routes, Route, Navigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/login-page/LoginPage.tsx';
import HomePage from './pages/home-page/HomePage.tsx';
import GlobalSpinner from './components/GlobalSpinner.tsx';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/register-page/RegisterPage.tsx';
import EmailPage from './pages/email-page/EmailPage.tsx';
import VerifyEmailToken from './pages/verfiy-email-token/VerfiyEmailToken.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import Layout from "./components/Layout";
import Explore from "./pages/Explore";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyTerms from "./pages/PrivacyTerms";
import NotFound from "./pages/NotFound";
import Home from './pages/Home.tsx';

export default function App() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  return (
    <>
      <GlobalSpinner />
      <Toaster position="top-right" />
      <Routes>
        {/* Wrapped elements that need a nav + footer */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
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
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <Explore />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/privacy&terms"
            element={
              <PrivateRoute>
                <PrivacyTerms />
              </PrivateRoute>
            }
          />
        </Route>
        
        <Route path="*" element={<NotFound />} />
        {/* Element that won't need a nav + footer */}

        {/* The one working on this please add the following pages:
        Login, Sign-up, Forgot Password, etc.. */}
      </Routes>
    </>
  );
}
