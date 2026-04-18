import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivacyTerms from './pages/PrivacyTerms';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Wrapped elements that need a nav + footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy&terms" element={<PrivacyTerms />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
      {/* Element that won't need a nav + footer */}

      {/* The one working on this please add the following pages:
        Login, Sign-up, Forgot Password, etc.. */}
    </Routes>
  );
}
